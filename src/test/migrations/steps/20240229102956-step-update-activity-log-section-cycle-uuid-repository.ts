import { SectionNames } from 'meta/routes'

import { BaseProtocol } from 'server/db'

export default async (client: BaseProtocol) => {
  // 1. Update public.activity_log.cycle_uuid to 2020
  await client.query(`
      with cycle_uuid as (select ac.uuid
                          from public.assessment
                                   left join public.assessment_cycle ac on assessment.id = ac.assessment_id
                          where ac.name = '2020'
                            and assessment.props ->> 'name' = 'fra'
          )
         , activity_log_entries as (
                          select al.id
                          from public.activity_log al
                              left join _legacy.repository r
                          on r.file_name = al.target ->> 'fileName'
                          where al.message ilike 'repositoryitem%'
                            and al.cycle_uuid is null
                            and r.file_name is not null
          )
      update public.activity_log
      set cycle_uuid = cycle_uuid.uuid from cycle_uuid, activity_log_entries
      where public.activity_log.id = activity_log_entries.id;
  `)

  // 2. Update public.activity_log.cycle_uuid to 2025
  await client.query(`
      with cycle_uuid as (select ac.uuid
                          from public.assessment
                                   left join public.assessment_cycle ac on assessment.id = ac.assessment_id
                          where ac.name = '2025'
                            and assessment.props ->> 'name' = 'fra'
          )
      update public.activity_log
      set cycle_uuid = cycle_uuid.uuid from cycle_uuid
      where public.activity_log.message ilike 'repositoryitem%'
        and public.activity_log.cycle_uuid is null
        and (public.activity_log.target ->> 'fileName' is not null
         or public.activity_log.target ->> 'files' is not null)
  `)

  // 3. Update all sections to repository where message contains repositoryitem
  await client.query(
    `
      update public.activity_log
      set section = $1
      where public.activity_log.message ilike 'repositoryitem%' or section ilike 'fileRepository'
  `,
    [SectionNames.Country.Home.repository]
  )
}
