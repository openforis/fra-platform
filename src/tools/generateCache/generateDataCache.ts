import { Assessment, AssessmentNames, Cycle, TableNames } from 'meta/assessment'
import { TablesCondition } from 'meta/data'

import { AreaController } from 'server/controller/area'
import { DB, Schemas } from 'server/db'
import { DataRedisRepository } from 'server/repository/redis/data'
import { Logger } from 'server/utils/logger'

export const generateDataCache = async (props: { assessment: Assessment; cycle: Cycle }) => {
  const { assessment, cycle } = props
  const assessmentName = assessment.props.name
  const cycleName = cycle.name

  const schemaName = Schemas.getName(assessment)

  const tables = await DB.one<TablesCondition>(
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

  const countries = await AreaController.getCountries({ assessment, cycle })
  const countryISOs = countries.map((c) => c.countryIso)

  const data = await DataRedisRepository.getTableData({ assessment, cycle, countryISOs, tables })

  Logger.info(`${assessmentName}-${cycleName}: "${Object.keys(data).length} data" generated`)
}
