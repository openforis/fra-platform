import * as pgPromise from 'pg-promise'

import { CountryIso } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'

import { Schemas } from 'server/db'
import { MaterializedViews } from 'server/db/materializedViews'
import { acceptedMessages } from 'server/repository/assessmentCycle/activityLog/query/acceptedMessages'
import { hiddenSections } from 'server/repository/assessmentCycle/activityLog/query/hiddenSections'

type Props = {
  countryIso: CountryIso
  assessment: Assessment
  cycle: Cycle

  select?: string

  limit?: string
  offset?: string
}

export const getActivityLogQuery = (props: Props) => {
  const { select: _select, countryIso, assessment, cycle, limit, offset } = props
  const pgp = pgPromise()

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)
  const mvName = MaterializedViews.getActivityLogCountry(countryIso)

  // default select
  const select = `a.*, to_jsonb(u.*) - 'profile_picture_file' - 'profile_picture_filename' as user`

  // when returning paginated result, return the activity log sorted by time
  const _limit = `
  order by time desc
  limit $3 offset $4
  `

  return pgp.as.format(
    `
      select
       ${_select || select}
      from (
        select
          country_iso, user_id, message, section, target, time,
          rank() OVER (PARTITION BY user_id, message, section ORDER BY time DESC) as rank
        from ${schemaCycle}.${mvName} a
        where 
              a.message in ($1:list)
          and a.section not in ($2:list)
      ) as a
      join public.users u on user_id = u.id
      where rank = 1
        ${limit && offset ? _limit : ''}
  `,
    [acceptedMessages, hiddenSections, limit, offset]
  )
}
