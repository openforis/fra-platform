import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { ActivityLogMessage, Assessment } from 'meta/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { Schemas } from 'server/db'

const activityMessages = [
  ActivityLogMessage.originalDataPointCreate,
  ActivityLogMessage.originalDataPointRemove,
  ActivityLogMessage.originalDataPointUpdate,
  ActivityLogMessage.originalDataPointUpdateDescription,
  ActivityLogMessage.originalDataPointUpdateDataSources,
  ActivityLogMessage.originalDataPointUpdateOriginalData,
  ActivityLogMessage.originalDataPointUpdateNationalClasses,
]

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryISOs: Array<CountryIso>
  year?: string
}

export const getLastAcceptedActivity = (props: Props): string => {
  const { assessment, cycle, countryISOs, year } = props
  const { name: assessmentName } = assessment.props
  const { name: cycleName } = cycle

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  return `select al.country_iso
               , al.message
               , al.target
               , row_number() over (partition by al.target ->> 'year' order by al.time desc) as row_number
          from public.activity_log al
                   left join public.assessment a on al.assessment_uuid = a.uuid
                   left join public.assessment_cycle ac on a.id = ac.assessment_id and al.cycle_uuid = ac.uuid
                   left join ${schemaCycle}.country_summary cs on al.country_iso = cs.country_iso
          where a.props ->> 'name' = '${assessmentName}'
            and ac.name = '${cycleName}'
            and al.country_iso in (${countryISOs.map((c) => `'${c}'`).join(',')})
            and al.message in (${activityMessages.map((m) => `'${m}'`).join(',')})
            and al.time < cs.last_accepted
              ${Objects.isEmpty(year) ? '' : `and al.target ->> 'year' = '${year}'`}
          order by al.time desc`
}
