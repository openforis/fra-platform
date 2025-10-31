import { Promises } from 'utils/promises'

import { CacheController } from 'server/cache/controller'
import { BaseProtocol, DB } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

// Update table_id to table_uuid for:
// - assessment_cycle -> assessment
// - section.parent_id -> section.parent_uuid

const client: BaseProtocol = DB
export default async (): Promise<void> => {
  // ====== Public schema

  // Add new UUIDs column
  await DB.none(`alter table public.assessment_cycle add column if not exists assessment_uuid uuid`)

  // Populate new columns
  await client.none(
    `update public.assessment_cycle ac
             set assessment_uuid = a.uuid
           from public.assessment a
             where ac.assessment_id = a.id`
  )

  // Update columns DDL: not null and add foreign key constraint
  await client.none(`
    alter table public.assessment_cycle
      alter column assessment_uuid set not null,
      add constraint assessment_cycle_assessment_uuid_fk
        foreign key (assessment_uuid)
        references public.assessment (uuid)
        on update cascade
        on delete cascade
  `)

  // Drop deprecated columns
  await client.none(`
    alter table public.assessment_cycle drop column if exists assessment_id
  `)

  const assessments = await CacheController.generateAssessments(client)

  // ====== Assessment schema
  // Same pattern for assessment_{assessmentName}.section.parent_id -> parent_uuid
  await Promises.each(Object.values(assessments), async (assessment) => {
    const schemaName = Schemas.getName(assessment)

    // Add new parent_uuid column
    await client.none(`alter table ${schemaName}.section add column if not exists parent_uuid uuid`)

    // Populate new column
    await client.none(`
      update ${schemaName}.section s
        set parent_uuid = parent.uuid
      from ${schemaName}.section parent
      where s.parent_id = parent.id
    `)

    // Update column DDL
    await client.none(`
      alter table ${schemaName}.section
        add constraint section_parent_uuid_fk
          foreign key (parent_uuid)
          references ${schemaName}.section (uuid)
          on update cascade
          on delete cascade
    `)

    // Drop deprecated column
    await client.none(`alter table ${schemaName}.section drop column if exists parent_id`)
  })
}
