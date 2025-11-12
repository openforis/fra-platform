import { Promises } from 'utils/promises'

import { CacheController } from 'server/cache/controller'
import { TableData } from 'server/controller/cycleData/tableData'
import { BaseProtocol, DB } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

// Update table_id to table_uuid for:
// - assessment_cycle.assessment_id -> assessment_cycle.assessment_uuid
// - section.parent_id -> section.parent_uuid
// - table_section.section_id -> table_section.section_uuid
// - table.table_section_id -> table.table_section_uuid
// - row.table_id -> row.table_uuid
// - col.row_id -> col.row_uuid

const client: BaseProtocol = DB
export default async (): Promise<void> => {
  // ============= - assessment_cycle.assessment_id -> assessment_cycle.assessment_uuid

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
  await Promises.each(Object.values(assessments), async (assessment) => {
    const schemaName = Schemas.getName(assessment)

    // Drop all table data views in cycle schemas (they depend on columns we edit later (row.id, etc.))
    await Promise.all(assessment.cycles.map((cycle) => TableData.dropViews({ assessment, cycle }, client)))

    // ============= section.parent_id -> section.parent_uuid

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

    // ============= table_section.section_id -> section.section_uuid

    await client.none(`alter table ${schemaName}.table_section add column if not exists section_uuid uuid`)

    await client.none(`
      update ${schemaName}.table_section ts
        set section_uuid = s.uuid
      from ${schemaName}.section s
      where ts.section_id = s.id
    `)

    await client.none(`
      alter table ${schemaName}.table_section
        alter column section_uuid set not null,
        add constraint table_section_section_uuid_fk
          foreign key (section_uuid)
          references ${schemaName}.section (uuid)
          on update cascade
          on delete cascade
    `)

    await client.none(`alter table ${schemaName}.table_section drop column if exists section_id`)

    // ============= table.table_section_id -> table_section.table_section_uuid

    await client.none(`alter table ${schemaName}.table add column if not exists table_section_uuid uuid`)

    await client.none(`
      update ${schemaName}.table t
        set table_section_uuid = ts.uuid
      from ${schemaName}.table_section ts
      where t.table_section_id = ts.id
    `)

    await client.none(`
      alter table ${schemaName}.table
        alter column table_section_uuid set not null,
        add constraint table_table_section_uuid_fk
          foreign key (table_section_uuid)
          references ${schemaName}.table_section (uuid)
          on update cascade
          on delete cascade
    `)

    await client.none(`alter table ${schemaName}.table drop column if exists table_section_id`)

    // ============= row.table_id -> table.table_uuid

    await client.none(`alter table ${schemaName}.row add column if not exists table_uuid uuid`)

    await client.none(`
      update ${schemaName}.row r
        set table_uuid = t.uuid
      from ${schemaName}.table t
      where r.table_id = t.id
    `)

    await client.none(`
      alter table ${schemaName}.row
        alter column table_uuid set not null,
        add constraint row_table_uuid_fk
          foreign key (table_uuid)
          references ${schemaName}.table (uuid)
          on update cascade
          on delete cascade
    `)

    await client.none(`alter table ${schemaName}.row drop column if exists table_id`)

    // ============= col.row_id -> row.row_uuid

    await client.none(`alter table ${schemaName}.col add column if not exists row_uuid uuid`)

    await client.none(`
      update ${schemaName}.col c
        set row_uuid = r.uuid
      from ${schemaName}.row r
      where c.row_id = r.id
    `)

    await client.none(`
      alter table ${schemaName}.col
        alter column row_uuid set not null,
        add constraint col_row_uuid_fk
          foreign key (row_uuid)
          references ${schemaName}.row (uuid)
          on update cascade
          on delete cascade
    `)

    await client.none(`alter table ${schemaName}.col drop column if exists row_id`)

    // recreate dropped views
    await Promise.all(assessment.cycles.map((cycle) => TableData.refreshViews({ assessment, cycle }, client)))

    await CacheController.generateMetadata({ assessment }, client)
  })
}
