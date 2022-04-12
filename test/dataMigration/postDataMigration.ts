import { Assessment, Col, Cols, Cycle, NodeValue, Row, VariableCache } from '@meta/assessment'
import { Objects } from '@core/utils'
import { AssessmentController } from '@server/controller/assessment'
import { BaseProtocol, DB, Schemas } from '@server/db'
import { evalExpression } from '@server/controller/cycleData/persistNodeValue/evalExpression'
import { ColRepository } from '@server/repository/col'
import { CycleDataRepository, TablesCondition } from '@server/repository/cycleData'
import * as pgPromise from 'pg-promise'

afterAll(async () => {
  await DB.$pool.end()
})

// eslint-disable-next-line camelcase
export type NodeRow = { country_iso: string; row_uuid: string; col_uuid: string; value: NodeValue }

const deleteWrongCalculatedNodes = async (
  props: { assessment: Assessment; cycle: Cycle },
  client: BaseProtocol
): Promise<void> => {
  const { assessment, cycle } = props
  const schemaAssessment = Schemas.getName(assessment)
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)
  return client.query(`
      delete
      from ${schemaCycle}.node n
      where n.id in (
          select n.id
          from ${schemaCycle}.node n
                   left join ${schemaAssessment}.col c
                             on n.col_uuid = c.uuid
                   left join ${schemaAssessment}.row r
                             on r.id = c.row_id

          where r.props ->> 'variableName' in ('total_native_placeholder', 'no_unknown', 'other_or_unknown')
      );

      delete
      from ${schemaCycle}.node n
      where n.id in (
          select n.id
          from ${schemaCycle}.node n
                   left join ${schemaAssessment}.col c
                             on n.col_uuid = c.uuid
                   left join ${schemaAssessment}.row r
                             on r.id = c.row_id
                   left join ${schemaAssessment}."table" t
                             on t.id = r.table_id
          where r.props ->> 'variableName' = 'other'
            and t.props ->> 'name' = 'holderOfManagementRights'
      );
  `)
}

const getTotalLandAreaValues = async (client: BaseProtocol): Promise<Array<NodeRow>> => {
  return client.many<NodeRow>(
    `
        select c.country_iso,
--        c.config -> 'faoStat'      as fao_stat,
--        t.props ->> 'name'         as table_name,
--        r.props ->> 'variableName' as variable_name,
               r.uuid  as row_uuid,
--        cl.props ->> 'colName'     as col_name,
               cl.uuid as col_uuid,
               jsonb_build_object(
                       'raw', jsonb_extract_path(
                       c.config, 'faoStat', cl.props ->> 'colName', 'area'
                   )::varchar
                   )   as value
--        c.config -> 'faoStat' ->
        from country c
                 left join assessment_fra."table" t
                           on t.props ->> 'name' = 'extentOfForest'
                 left join assessment_fra.row r
                           on r.table_id = t.id
                               and r.props ->> 'variableName' = 'totalLandArea'
                 left join assessment_fra.col cl
                           on r.id = cl.row_id
                               and cl.props ->> 'colName' is not null
    `
  )
}
const getCertifiedAreaValues = async (client: BaseProtocol): Promise<Array<NodeRow>> => {
  return client.many<NodeRow>(
    `
        select c.country_iso,
--        c.config -> 'faoStat'      as fao_stat,
--        t.props ->> 'name'         as table_name,
--        r.props ->> 'variableName' as variable_name,
               r.uuid  as row_uuid,
--        cl.props ->> 'colName'     as col_name,
               cl.uuid as col_uuid,
               jsonb_build_object(
                       'raw', jsonb_extract_path(
                       c.config, 'certifiedAreas', cl.props ->> 'colName'
                   )
                   )   as value
--        c.config -> 'faoStat' ->
        from country c
                 left join assessment_fra."table" t
                           on t.props ->> 'name' = 'sustainableDevelopment15_2_1_5'
                 left join assessment_fra.row r
                           on r.table_id = t.id
                               and r.props ->> 'variableName' = 'forestAreaVerifiedForestManagement'
                 left join assessment_fra.col cl
                           on r.id = cl.row_id
                               and cl.props ->> 'colName' is not null
    `
  )
}

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
      await deleteWrongCalculatedNodes({ assessment, cycle }, client)
      const schema = Schemas.getName(assessment)

      const rows = await client.map<Row & { tableName: string; cols: Array<Col> }>(
        `
            select r.*,
                   t.props ->> 'name' as table_name,
                   jsonb_agg(c.*)     as cols
            from ${schema}.row r
                     left join ${schema}."table" t
                               on r.table_id = t.id
                     left join ${schema}.col c on r.id = c.row_id
            where r.props ->> 'calculateFn' is not null
               or c.props ->> 'calculateFn' is not null
            group by r.id, r.uuid, r.props, t.props ->> 'name'`,
        [],
        // @ts-ignore
        Objects.camelize
      )

      const variablesToCalculate = rows.map<VariableCache>((row) => ({
        tableName: row.tableName,
        variableName: row.props.variableName,
      }))
      const calculatedVariables: Record<string, Record<string, boolean>> = {}
      const countries = await AssessmentController.getCountries({ assessment, cycle }, client)
      const countryISOs = countries.map((c) => c.countryIso)

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
                if (!col) return
                const { variableName } = row.props

                const expression = row.props.calculateFn ?? col.props.calculateFn
                const raw = await evalExpression(
                  { tableName, assessment, colName, countryIso, variableName, cycle, data, row, expression },
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
                  value: { raw: raw ? String(raw) : null, calculated: true },
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

      // ===== total land area (fao stat)
      const totalLandAreaValues = await getTotalLandAreaValues(client)
      await client.query(pgp.helpers.insert(totalLandAreaValues, cs))

      // ===== certified area  - SDG sub ind. 5
      const certifiedAreaValues = await getCertifiedAreaValues(client)
      await client.query(pgp.helpers.insert(certifiedAreaValues, cs))

      // ===== calculation rows
      for (let i = 0; i < rows.length; i += 1) {
        const { tableName, ...row } = rows[i]
        if (!['growingStockAvg', 'growingStockTotal'].includes(tableName)) {
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
          // console.log('calculating ', tableName, row.props.variableName)
          // eslint-disable-next-line no-await-in-loop
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
          // eslint-disable-next-line no-await-in-loop
          await client.query(query)
          // console.log('INSERT DONE ', tableName, row.props.variableName)
        }
      }
    })
  })
})
