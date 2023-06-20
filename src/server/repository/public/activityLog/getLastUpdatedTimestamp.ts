import { CountryIso } from 'meta/area'
import { ActivityLogMessage, Assessment, Cycle } from 'meta/assessment'

import { BaseProtocol, DB } from 'server/db'

type Props = {
  countryIso: CountryIso
  assessment: Assessment
  cycle: Cycle
  messages: Array<ActivityLogMessage>
}

type Returned = {
  time?: string
}

export const getLastUpdatedTimestamp = async (props: Props, client: BaseProtocol = DB): Promise<Returned> => {
  const { countryIso, assessment, cycle, messages } = props

  const timestamp = await client.oneOrNone<Returned>(
    `
      select a.time
      from activity_log a
      where a.assessment_uuid = $1
        and a.cycle_uuid = $2
        and a.country_iso = $3
        and a.message in ($4:list)
      order by a.time desc
      limit 1;
  `,
    [assessment.uuid, cycle.uuid, countryIso, messages]
  )

  return timestamp ?? { time: undefined }
}
