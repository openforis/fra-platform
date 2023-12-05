import { Assessment, AssessmentNames, Cycle, TableNames } from 'meta/assessment'
import { RecordCountryData, TablesCondition } from 'meta/data'

import { BaseProtocol, DB, Schemas } from 'server/db'
import { CountryRepository } from 'server/repository/assessmentCycle/country'
import { DataRedisRepository } from 'server/repository/redis/data'
import { Logger } from 'server/utils/logger'

type Props = {
  assessment: Assessment
  cycle: Cycle
  force?: boolean
}

export const generateDataCache = async (props: Props, client: BaseProtocol = DB): Promise<RecordCountryData> => {
  const { assessment, cycle, force } = props
  const assessmentName = assessment.props.name
  const cycleName = cycle.name

  const schemaName = Schemas.getName(assessment)

  const tables = await client.one<TablesCondition>(
    `
        select jsonb_object_agg(t.props->>'name','{}'::jsonb) as data
        from ${schemaName}."table" t
        where t.props -> 'cycles' ? $1;
    `,
    [cycle.uuid],
    ({ data }) => data
  )
  if (assessmentName === AssessmentNames.fra) {
    tables[TableNames.originalDataPointValue] = {}
  }

  const countries = await CountryRepository.getMany({ assessment, cycle }, client)
  const countryISOs = countries.map((c) => c.countryIso)

  const data = await DataRedisRepository.getCountriesData({ assessment, cycle, countryISOs, tables, force }, client)
  Logger.info(`${assessmentName}-${cycleName}: "${Object.keys(data).length} data" generated`)

  return data
}
