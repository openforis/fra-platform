import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { BaseProtocol, DB } from 'server/db/db'
import { acceptedMessages } from 'server/db/repository/assessmentCycle/countryActivityLog/_common/acceptedMessages'
import { getMaterializedViewName } from 'server/db/repository/assessmentCycle/countryActivityLog/_common/getMaterializedViewName'
import { hiddenSections } from 'server/db/repository/assessmentCycle/countryActivityLog/_common/hiddenSections'
import { excludeFoldersClause } from 'server/db/repository/assessmentCycle/countryActivityLog/_common/select'
import { Schemas } from 'server/db/schemas'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
}

export const createMaterializedView = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { assessment, countryIso, cycle } = props

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)
  const viewName = getMaterializedViewName(countryIso)

  await client.query(
    `
        create materialized view ${schemaCycle}.${viewName} as (
          select a.message,
                 a.section,
                 a.target,
                 md5(a.target::text) as target_md5,
                 a.time,
                 to_jsonb(u.*) as user
          from (select user_id,
                       message,
                       section,
                       target,
                       time,
                       rank() OVER (
                          PARTITION BY user_id
                          , message
                          , case when section = 'users' then target ->> 'userUuid' else section end
                          ORDER BY time DESC
                        ) as rank
                from public.activity_log a
                where a.country_iso = $1
                  and a.assessment_uuid = $2
                  and a.cycle_uuid = $3
                  and a.message in ($4:list)
                  and a.section not in ($5:list)
                  and ${excludeFoldersClause}) as a
                 join public.users u on user_id = u.id
          where rank = 1
          order by time desc
        )
    `,
    [countryIso, assessment.uuid, cycle.uuid, acceptedMessages, hiddenSections]
  )

  // await client.query(`CREATE UNIQUE INDEX ON ${schemaCycle}.${viewName} (message,target_md5,time);`)
}
