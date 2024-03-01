import { SectionNames } from 'meta/routes'

import { BaseProtocol } from 'server/db'

export default async (client: BaseProtocol) => {
  await client.query(
    `
        update public.activity_log
        set section = $1
        where public.activity_log.message ilike 'repositoryitem%' or section ilike 'fileRepository'
    `,
    [SectionNames.Country.Home.repository]
  )

  await client.query(`
    -- get uuid for cycle 2020
      with cycle_uuid_2020 as (select ac.uuid
                               from public.assessment
                                        left join public.assessment_cycle ac on assessment.id = ac.assessment_id
                               where ac.name = '2020'
                                 and assessment.props ->> 'name' = 'fra'),
    -- get uuid for cycle 2025
          cycle_uuid_2025 as (select ac.uuid
                              from public.assessment
                                  left join public.assessment_cycle ac on assessment.id = ac.assessment_id
                              where ac.name = '2025'
                                and assessment.props ->> 'name' = 'fra')

    -- update activity log : after 2023, cycle_uuid = cycle_uuid_2025.uuid,
    -- before 2023, cycle_uuid = cycle_uuid_2020.uuid

      update public.activity_log al
      set cycle_uuid = case
                           when al.time >= '2023-01-01' then cu2025.uuid
                           else cu2020.uuid
                      end
      from cycle_uuid_2020 cu2020, cycle_uuid_2025 cu2025
      where al.section = 'repository'
        and al.cycle_uuid is null;
  `)
}
