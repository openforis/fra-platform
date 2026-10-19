import { Assessment, AssessmentNames } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { TableNames } from 'meta/assessment/table'
import { RecordCountryData } from 'meta/data/recordData'
import { TablesCondition } from 'meta/data/tableCondition'

import { DataRedisRepository } from 'server/cache/repository/data'
import { BaseProtocol, DB } from 'server/db/db'
import { CountryRepository } from 'server/db/repository/assessmentCycle/country'
import { Schemas } from 'server/db/schemas'
import { Logger } from 'server/utils/logger'

type Props = {
  assessment: Assessment
  cycle: Cycle
}

export const generateData = async (props: Props, client: BaseProtocol = DB): Promise<RecordCountryData> => {
  const { assessment, cycle } = props
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

  const data = await DataRedisRepository.getCountriesData(
    { assessment, cycle, countryISOs, tables, force: true },
    client
  )
  Logger.info(`${assessmentName}-${cycleName}: "${Object.keys(data).length} data" generated`)

  return data
}
