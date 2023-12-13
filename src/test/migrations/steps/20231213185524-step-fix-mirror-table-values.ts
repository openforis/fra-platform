import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'
import { Promises } from 'utils/promises'

import { CountryIso } from 'meta/area'
import {
  Assessment,
  AssessmentNames,
  ColName,
  Cycle,
  NodeValue,
  TableName,
  TableNames,
  VariableName,
} from 'meta/assessment'
import { NodeUpdate } from 'meta/data'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'
import { RowRepository } from 'server/repository/assessment/row'
import { NodeDb } from 'server/repository/assessmentCycle/node'
import { Logger } from 'server/utils/logger'

import { updateDependencies } from 'test/migrations/steps/utils/updateDependencies'

const assessmentName = AssessmentNames.fra
const cycleName = '2025'

type ValueCheck = {
  countryIso: CountryIso
  variableName: VariableName
  colName: ColName
  avg: NodeValue
  tot: NodeValue
}

type Props = {
  assessment: Assessment
  cycle: Cycle
  tableNameAvg: TableName
  tableNameTot: TableName
}

const exec = async (props: Props, client: BaseProtocol): Promise<void> => {
  const { assessment, cycle, tableNameAvg, tableNameTot } = props

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  const rowCaches = await RowRepository.getManyCache({ assessment }, client)
  const rowsAvg = rowCaches.filter((r) => r.tableName === tableNameAvg)
  const rowsTot = rowCaches.filter((r) => r.tableName === tableNameTot)
  const nodesDb: Array<NodeDb> = []
  // @ts-ignore
  const countryNodes: Record<CountryIso, Array<NodeUpdate>> = {}

  const checks = await client.map<ValueCheck>(
    `
        select a.country_iso
             , a.variable_name
             , a.col_name
             , a.value as avg
             , t.value as tot
        from ${schemaCycle}.${tableNameAvg.toLowerCase()} a
                 left join ${schemaCycle}.${tableNameTot.toLowerCase()} t
                           on a.country_iso = t.country_iso and a.variable_name = t.variable_name and
                              a.col_name = t.col_name
        where a.value is not null
          and t.value is not null
          and ((a.value ->> 'calculated' is null and t.value ->> 'calculated' is null) or
               (a.value ->> 'calculated' = 'true' and t.value ->> 'calculated' = 'true'))
        order by 1, 2, 3;
    `,
    [],
    (res) => Objects.camelize(res)
  )

  const _addUpdate = ({ avgCalc, check }: { avgCalc: boolean; check: ValueCheck }): void => {
    const { countryIso, variableName, colName, avg, tot } = check

    if (!countryNodes[countryIso]) countryNodes[countryIso] = []

    const rowAvg = rowsAvg.find((r) => r.props.variableName === variableName)
    const colAvg = rowAvg.cols.find((c) => c.props.colName === colName)
    const valueAvg: NodeValue = { ...avg, calculated: avgCalc ? true : undefined }
    const nodeDbAvg: NodeDb = { country_iso: countryIso, row_uuid: rowAvg.uuid, col_uuid: colAvg.uuid, value: valueAvg }
    nodesDb.push(nodeDbAvg)
    const nodeUpdateAvg: NodeUpdate = { tableName: tableNameAvg, variableName, colName, value: valueAvg }
    countryNodes[countryIso].push(nodeUpdateAvg)

    const rowTot = rowsTot.find((r) => r.props.variableName === variableName)
    const colTot = rowTot.cols.find((c) => c.props.colName === colName)
    const valueTot: NodeValue = { ...tot, calculated: avgCalc ? undefined : true }
    const nodeDbTot: NodeDb = { country_iso: countryIso, row_uuid: rowTot.uuid, col_uuid: colTot.uuid, value: valueTot }
    nodesDb.push(nodeDbTot)
    const nodeUpdateTot: NodeUpdate = { tableName: tableNameTot, variableName, colName, value: valueTot }
    countryNodes[countryIso].push(nodeUpdateTot)
  }

  Logger.info(`====== found ${checks.length} nodes to fix`)

  checks.forEach((check) => {
    const { countryIso, variableName, colName, avg, tot } = check

    const logKey = `${countryIso}-${variableName}-${colName}`
    let found: boolean

    if (!avg || !tot) {
      throw new Error(`avg or tot null: ${logKey} avg:${JSON.stringify(avg)} tot:${JSON.stringify(tot)}}`)
    }

    if (avg.raw && tot.raw) {
      const avgDec = Numbers.countDecimal(Number(avg.raw))
      const totDec = Numbers.countDecimal(Number(tot.raw))
      if (avgDec <= 2) {
        // Logger.info(`avg not, total yes ${logKey} avg:${JSON.stringify(avg)} tot:${JSON.stringify(tot)}}`)
        _addUpdate({ avgCalc: false, check })
        found = true
      } else if (totDec <= 2) {
        // Logger.info(`avg yes, total no ${logKey} avg:${JSON.stringify(avg)} tot:${JSON.stringify(tot)}}`)
        _addUpdate({ avgCalc: true, check })
        found = true
      } else {
        // both more than 2 decimal points
        // Logger.info(`avg not, total yes ${logKey} avg:${JSON.stringify(avg)} tot:${JSON.stringify(tot)}}`)
        _addUpdate({ avgCalc: false, check })
        found = true
      }
    }
    if (!avg.raw && !tot.raw) {
      // Logger.info(`avg not, total yes ${logKey} avg:${JSON.stringify(avg)} tot:${JSON.stringify(tot)}}`)
      _addUpdate({ avgCalc: false, check })
      found = true
    }
    if (avg.raw && !tot.raw) {
      // Logger.info(`avg not, total yes ${logKey} avg:${JSON.stringify(avg)} tot:${JSON.stringify(tot)}}`)
      _addUpdate({ avgCalc: false, check })
      found = true
    }
    if (!avg.raw && tot.raw) {
      // Logger.info(`avg yes, total not ${logKey} avg:${JSON.stringify(avg)} tot:${JSON.stringify(tot)}}`)
      _addUpdate({ avgCalc: true, check })
      found = true
    }

    if (!found) {
      throw new Error(`!found  ${logKey} avg:${JSON.stringify(avg)} tot:${JSON.stringify(tot)}}`)
    }
  })

  // update db
  Logger.info(`Node updates found ${nodesDb.length}`)

  await client.query(
    nodesDb.map(
      (node) => `
          update ${schemaCycle}.node n
          set value = '${JSON.stringify(node.value)}'::jsonb
          where country_iso = '${node.country_iso}'
            and row_uuid = '${node.row_uuid}'
            and col_uuid = '${node.col_uuid}'
      `
    ).join(`;
  `)
  )
  await AssessmentController.generateDataCache({ assessment, cycle, force: true }, client)

  await updateDependencies({ assessment, cycle, countryNodes, includeSourceNodes: true }, client)
}

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle(
    { assessmentName, cycleName, metaCache: true },
    client
  )
  await Promises.each(
    [
      { tableNameAvg: TableNames.biomassStockAvg, tableNameTot: TableNames.biomassStockTotal },
      { tableNameAvg: TableNames.carbonStockAvg, tableNameTot: TableNames.carbonStockTotal },
      { tableNameAvg: TableNames.growingStockAvg, tableNameTot: TableNames.growingStockTotal },
    ],
    ({ tableNameAvg, tableNameTot }) => exec({ assessment, cycle, tableNameAvg, tableNameTot }, client)
  )
}
