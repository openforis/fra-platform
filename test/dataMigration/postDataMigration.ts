import { Cols, NodeValue, Row, VariableCache } from '@meta/assessment'
import { Objects } from '@core/utils'
import { AssessmentController } from '@server/controller'
import { DB, Schemas } from '@server/db'
import { evalExpression } from '@server/controller/cycleData/persistNodeValue/evalExpression'
import { ColRepository } from '@server/repository/col'
import { CycleDataRepository, TablesCondition } from '@server/repository/cycleData'
import * as pgPromise from 'pg-promise'

afterAll(async () => {
  await DB.$pool.end()
})

// eslint-disable-next-line camelcase
export type NodeRow = { country_iso: string; row_uuid: string; col_uuid: string; value: NodeValue }

describe('Post Data migration', () => {
  test('Update calculated variables', async () => {
    await DB.tx(async (client) => {
      const { assessment, cycle } = await AssessmentController.getOneWithCycle(
        {
          name: 'fra',
          cycleName: '2020',
          metaCache: true,
        },
        client
      )
      const schema = Schemas.getName(assessment)

      const rows = await client.map<Row & { tableName: string }>(
        `select r.*, t.props ->> 'name' as table_name
            from ${schema}.row r
                     left join ${schema}."table" t
                               on r.table_id = t.id
            where r.props ->> 'calculateFn' is not null`,
        [],
        // @ts-ignore
        Objects.camelize
      )

      const variablesToCalculate = rows.map<VariableCache>((row) => ({
        tableName: row.tableName,
        variableName: row.props.variableName,
      }))
      const calculatedVariables: Record<string, Record<string, boolean>> = {}
      const countryISOs = await AssessmentController.getCountryISOs({ name: 'fra' }, client)

      const hasBeenCalculated = (variable: VariableCache): boolean => {
        const variableToCalc = variablesToCalculate.find(
          (v) => v.tableName === variable.tableName && v.variableName === variable.variableName
        )
        if (variableToCalc) {
          return Boolean(calculatedVariables[variable.tableName]?.[variable.variableName])
        }
        return true
      }

      const calculateRow = async (props: { row: Row; tableName: string }): Promise<Array<NodeRow>> => {
        const values: Array<NodeRow> = []
        const visited: Record<string, Record<string, Record<string, boolean>>> = {}

        const { row, tableName } = props
        if (hasBeenCalculated({ variableName: row.props.variableName, tableName })) {
          return Promise.resolve([])
        }

        // console.log('====== calculating ', tableName, row.props.variableName)
        const dependencies: Array<VariableCache> =
          assessment.metaCache.calculations.dependencies[tableName]?.[row.props.variableName] ?? []
        const tables = dependencies.reduce<TablesCondition>((acc, { tableName }) => ({ ...acc, [tableName]: {} }), {})
        const data =
          Object.keys(tables).length > 0
            ? await CycleDataRepository.getTableData({ assessment, cycle, countryISOs, tables }, client)
            : undefined
        // const dependencies = assessment.metaCache.calculations.dependencies[tableName]?.[row.props.variableName] ?? []
        // await Promise.all(
        //   dependencies.map(async (dependency) => {
        //     if (!hasBeenCalculated(dependency)) {
        //       const rowDep = rows.find(
        //         (r) => r.props.variableName === dependency.variableName && r.tableName === dependency.tableName
        //       )
        //       console.log('====== calculating dependency', rowDep.tableName, rowDep.props.variableName)
        //       await calculateRow({ row: rowDep, tableName: rowDep.tableName })
        //     }
        //   })
        // )

        const cols = await ColRepository.getMany({ assessment, tableId: row.tableId }, client)
        const colIndexes = Cols.getColIndexes({ rows, cols })
        await Promise.all(
          countryISOs.map(async (countryIso) => {
            await Promise.all(
              colIndexes.map(async (colIdx) => {
                const colName = Cols.getColName({ colIdx, cols })
                const col = cols.find((c) => c.rowId === row.id && c.props.index === colIdx)
                const { variableName } = row.props

                const raw = await evalExpression(
                  { tableName, assessment, colName, countryIso, variableName, cycle, data, row },
                  client
                )
                // const nodeProps = { tableName, countryIso, variableName, cycle, colName, assessment }
                // const node: Node = await NodeRepository.getOneOrNone(nodeProps, client)
                // if (node) throw new Error(`node found ${JSON.stringify(nodeProps)}`)
                // const nodeUpdated = await (node
                //   ? NodeRepository.update({ ...nodeProps, value: { raw } }, client)
                //   : NodeRepository.create({ ...nodeProps, value: { raw } }, client))
                // console.log(nodeUpdated)
                const value: NodeRow = {
                  country_iso: countryIso,
                  row_uuid: row.uuid,
                  col_uuid: col.uuid,
                  value: { raw: String(raw) },
                }
                if (
                  values.find(
                    (v) =>
                      v.country_iso === value.country_iso &&
                      v.row_uuid === value.row_uuid &&
                      v.col_uuid === value.col_uuid
                  )
                ) {
                  throw new Error(`Duplicate node ${JSON.stringify(value)}`)
                }

                if (visited[countryIso]?.[row.uuid]?.[col.uuid]) {
                  throw new Error(`Duplicate node ${JSON.stringify(value)}`)
                }

                values.push(value)
                if (!visited[countryIso]) visited[countryIso] = {}
                if (!visited[countryIso][row.uuid]) visited[countryIso][row.uuid] = {}
                visited[countryIso][row.uuid][col.uuid] = true
              })
            )
          })
        )
        if (!calculatedVariables[tableName]) calculatedVariables[tableName] = {}
        calculatedVariables[tableName][row.props.variableName] = true

        return values
      }

      const schemaCycle = Schemas.getNameCycle(assessment, cycle)
      const pgp = pgPromise()
      const cs = new pgp.helpers.ColumnSet(
        [
          'country_iso',
          'row_uuid',
          'col_uuid',
          {
            name: 'value',
            cast: 'jsonb',
          },
        ],
        {
          table: { table: 'node', schema: schemaCycle },
        }
      )

      await Promise.all(
        rows.map(async ({ tableName, ...row }) => {
          // const dependencies = assessment.metaCache.calculations.dependencies[tableName]?.[row.props.variableName] ?? []
          //
          // await Promise.all(
          //   dependencies.map(async (dependency) => {
          //     if (!hasBeenCalculated(dependency)) {
          //       // await
          //     }
          //   })
          // )

          // if (dependencies.length === 0) {
          const values = await calculateRow({ row, tableName })
          // const nodes = await client.map<Node>(
          //   `select * from ${Schemas.getNameCycle(assessment, cycle)}.node`,
          //   [],
          //   // @ts-ignore
          //   Objects.camelize
          // )
          // const node = nodes.find(({ colUuid, countryIso, rowUuid }) =>
          //   values.find(
          //     (value) => value.col_uuid === colUuid && value.row_uuid === rowUuid && value.country_iso === countryIso
          //   )
          // )
          // if (node) {
          //   console.log('======= NODE ', node)
          // }
          const query = pgp.helpers.insert(values, cs)
          await client.none(query)
          // }
        })
      )
    })
  })
})
