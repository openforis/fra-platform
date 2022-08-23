import { Objects } from '@core/utils'

import { CountryIso } from '@meta/area'
import { ActivityLog, Assessment } from '@meta/assessment'

import { BaseProtocol, DB, Schemas } from '@server/db'

export const getCycleDataActivities = (
  props: { assessment: Assessment; countryIso?: CountryIso },
  client: BaseProtocol = DB
): Promise<Array<ActivityLog<any>>> => {
  const { assessment, countryIso } = props

  const schema = Schemas.getName(assessment)

  return client.map<ActivityLog<any>>(
    `
      select
        a.*,
        to_jsonb(u.*) - 'profile_picture_file' - 'profile_picture_filename' as user  
      from (
        select
          user_id, message, section, target, time,
          rank() OVER (PARTITION BY user_id, message, section ORDER BY time DESC) as rank
        from ${schema}.activity_log a
        where a.country_iso = $1
          and message != 'deleteComment'
      ) as a
      join public.users u on user_id = u.id
      where rank = 1
      order by time desc
      limit 20
    `,
    [countryIso],

    (row) => Objects.camelize(row)
  )
}
