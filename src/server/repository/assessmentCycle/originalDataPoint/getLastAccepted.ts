import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { ActivityLogMessage, Assessment, Cycle, OriginalDataPoint } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
  year: string
}

const activityMessages = [
  ActivityLogMessage.originalDataPointCreate,
  ActivityLogMessage.originalDataPointRemove,
  ActivityLogMessage.originalDataPointUpdate,
  ActivityLogMessage.originalDataPointUpdateDescription,
  ActivityLogMessage.originalDataPointUpdateDataSources,
  ActivityLogMessage.originalDataPointUpdateOriginalData,
  ActivityLogMessage.originalDataPointUpdateNationalClasses,
]

const getLastAcceptedQuery = (props: Omit<Props, 'year'> & { year?: string }): string => {
  const { assessment, cycle, countryIso, year } = props
  const { name: assessmentName } = assessment.props
  const { name: cycleName } = cycle

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  return `with activities as
                   (select al.country_iso
                         , al.message
                         , al.target
                         , row_number() over (partition by al.target ->> 'year' order by al.time desc) as row_number
                    from public.activity_log al
                             left join public.assessment a on al.assessment_uuid = a.uuid
                             left join public.assessment_cycle ac on a.id = ac.assessment_id and al.cycle_uuid = ac.uuid
                             left join ${schemaCycle}.country_summary cs on al.country_iso = cs.country_iso
                    where a.props ->> 'name' = '${assessmentName}'
                      and ac.name = '${cycleName}'
                      and al.country_iso = '${countryIso}'
                      and al.message in (${activityMessages.map((m) => `'${m}'`).join(',')})
                      and al.time < cs.last_accepted
                        ${Objects.isEmpty(year) ? '' : `and al.target ->> 'year' = '${year}'`}
                    order by al.time desc)
          select a.country_iso
               , a.target ->> 'year' as year
               , a.target            as odp
          from activities a
          where a.row_number = 1
  ;
  `
}

export const getLastAccepted = async (
  props: Props,
  client: BaseProtocol = DB
): Promise<OriginalDataPoint | undefined> => {
  return client.oneOrNone<OriginalDataPoint>(getLastAcceptedQuery(props), [], ({ odp }) => odp)
}
