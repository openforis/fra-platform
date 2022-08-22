import { Objects } from '@core/utils'

import { CountryIso } from '@meta/area'
import { ActivityLog, Assessment } from '@meta/assessment'

import { BaseProtocol, DB, Schemas } from '@server/db'

export const getMany = (
  props: { assessment: Assessment; countryIso?: CountryIso },
  client: BaseProtocol = DB
): Promise<Array<ActivityLog<any>>> => {
  const { assessment, countryIso } = props

  const schema = Schemas.getName(assessment)

  return client.map<ActivityLog<any>>(
    `
      select
          u.id as user_id,
          u.name as full_name,
          u.email,
          message,
          section as section_name,
          target,
          to_char(time, 'YYYY-MM-DD"T"HH24:MI:ssZ') AS edit_time
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
