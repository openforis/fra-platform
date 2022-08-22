import { Objects } from '@core/utils'

import { CountryIso } from '@meta/area'
import { Assessment } from '@meta/assessment'

import { BaseProtocol, DB, Schemas } from '@server/db'

export const getMany = (
  props: { assessment: Assessment; countryIso?: CountryIso },
  client: BaseProtocol = DB
): Promise<Array<Col>> => {
  const { assessment, countryIso } = props
  if ((rowId && tableId) || (!rowId && !tableId)) {
    throw new Error(`Only and only one between rowId and tableId must be present`)
  }
  const schema = Schemas.getName(assessment)

  return client.map<Col>(
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
	where a.country_iso = 'FIN'
		and message != 'deleteComment'
) as a

join public.users u on user_id = u.id

      WHERE rank = 1
      ORDER BY time DESC
      LIMIT 20






    `,
    [countryIso],

    Objects.camelize
  )
}
