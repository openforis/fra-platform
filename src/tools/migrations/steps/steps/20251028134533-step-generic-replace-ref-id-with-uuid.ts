import { BaseProtocol } from 'server/db/db'

// Update table_id to table_uuid for:
// - assessment_cycle -> assessment

export default async (client: BaseProtocol): Promise<void> => {
  // Add new UUIDs
  await client.none(`alter table public.assessment_cycle add column if not exists assessment_uuid uuid`)

  // Populate
  await client.none(
    `update public.assessment_cycle ac
             set assessment_uuid = a.uuid
           from public.assessment a
             where ac.assessment_id = a.id`
  )

  // Update column: not null and add foreign key constraint
  await client.none(`
    alter table public.assessment_cycle
      alter column assessment_uuid set not null,
      add constraint assessment_cycle_assessment_uuid_fk
        foreign key (assessment_uuid)
        references public.assessment (uuid)
        on update cascade
        on delete cascade
  `)

  // Drop deprecated column
  await client.none(`
    alter table public.assessment_cycle drop column if exists assessment_id
  `)
}
