import 'tsconfig-paths/register'
import 'dotenv/config'

import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { Assessment, Cycle, TableName } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { CycleDataController } from 'server/controller/cycleData'
import { BaseProtocol, DB, Schemas } from 'server/db'
import { CountryRepository } from 'server/repository/assessmentCycle/country'
import { Logger } from 'server/utils/logger'

const assessmentName = 'fra'
const cycleName = '2025'

export const getDeprecatedEstimatedCountryIsosAndTableNames = async (
  props: { assessment: Assessment; cycle: Cycle },
  client: BaseProtocol
): Promise<Array<{ countryIso: CountryIso; tableName: TableName }>> => {
  const { assessment, cycle } = props
  const schemaAssessment = Schemas.getName(assessment)
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  return client.map<{ countryIso: CountryIso; tableName: TableName }>(
    `
        select distinct n.country_iso,
                        t.props ->> 'name' as table_name
        from ${schemaCycle}.node n
                 left join ${schemaAssessment}.col c on n.col_uuid = c.uuid
                 left join ${schemaAssessment}.row r on r.id = c.row_id
                 left join ${schemaAssessment}."table" t on t.id = r.table_id
        where n.value ->> 'estimated' = 'true'
          and n.value ->> 'estimationUuid' is null
        order by 1, 2
    `,
    [],
    (res) => Objects.camelize(res)
  )
}

export const getAllTableNames = async (
  props: { assessment: Assessment; cycle: Cycle },
  client: BaseProtocol
): Promise<Array<TableName>> => {
  const { assessment, cycle } = props
  const schemaAssessment = Schemas.getName(assessment)

  return client.map<TableName>(
    `
        select t.props ->> 'name' as table_name
        from ${schemaAssessment}."table" t
        where t.props->'cycles' @> '"[${cycle.uuid}]"'::jsonb
    `,
    [],
    (res) => res.table_name
  )
}

const close = async () => {
  await DB.$pool.end()
}

const exec = async () => {
  await DB.tx(async (client) => {
    const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName }, client)
    const countries = await CountryRepository.getMany({ assessment, cycle }, client)
    const countryISOs = countries.map((c) => c.countryIso)

    const tableNames = await getAllTableNames({ assessment, cycle }, client)
    const data = await CycleDataController.getTableData(
      { assessment, cycle, countryISOs, aggregate: false, columns: [], mergeOdp: true, tableNames, variables: [] },
      client
    )
    const tables = await getDeprecatedEstimatedCountryIsosAndTableNames({ assessment, cycle }, client)
    Logger.info(countryISOs)
    await Promise.all(
      tables.map(({ countryIso, tableName }) => {
        Logger.info('====== ', tableName, countryIso, data)
        return Promise.resolve()
      })
    )
  })

  await close()
}

Logger.info('Estimations reverse engineer starting')
exec().then(() => {
  Logger.info('Estimations reverse engineer generated')
})
