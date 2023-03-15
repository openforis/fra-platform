import { Objects } from '@utils/objects'

import { AssessmentController } from '@server/controller/assessment'
import { BaseProtocol, DB, Schemas } from '@server/db'

export default async (client: BaseProtocol) => {
  const updateTargets = await client.map(
    `select a.props ->> 'name' as assessment_name, c.name as cycle_name
     from public.assessment a
              left join public.assessment_cycle c on a.id = c.assessment_id;`,
    [],
    (row) => Objects.camelize(row)
  )

  // eslint-disable-next-line no-restricted-syntax
  for await (const params of updateTargets) {
    const { assessment, cycle } = await AssessmentController.getOneWithCycle(params)
    const schemaCycle = Schemas.getNameCycle(assessment, cycle)
    const schemaName = Schemas.getName(assessment)

    await DB.query(`
        alter table ${schemaCycle}.message_topic
            drop constraint if exists message_topic_section_uuid_fk;`)

    await DB.query(`
        alter table ${schemaCycle}.message_topic
            add column if not exists section_uuid uuid,
            add constraint message_topic_section_uuid_fk
                foreign key (section_uuid) references ${schemaName}.section ("uuid")
                    on update cascade on delete cascade;`)
  }

  // eslint-disable-next-line no-restricted-syntax
  for await (const params of updateTargets) {
    const { assessment, cycle } = await AssessmentController.getOneWithCycle(params)

    const schemaCycle = Schemas.getNameCycle(assessment, cycle)
    const schemaName = Schemas.getName(assessment)

    await DB.query(`
      update
          ${schemaCycle}.message_topic mt
      set section_uuid = s.uuid
      from assessment_fra.row r
               left join ${schemaName}.table t on r.table_id = t.id
               left join ${schemaName}.table_section ts on t.table_section_id = ts.id
               left join ${schemaName}.section s on ts.section_id = s.id
      where r.uuid::text in (select key from ${schemaCycle}.message_topic)
        and mt.key = r.uuid::text;
  `)
  }

  // Only relevant for assessment_fra_2025
  await DB.query(`
      update
          assessment_fra_2025.message_topic mt
      set section_uuid = s.uuid
      from assessment_fra.section s
      where mt.key like 'commentable-description%'
        and split_part(mt.key, '_', 4) like s.props ->> 'name';
  `)

  // update section_uuids for dataSource columns
  await DB.query(`
    with datasources as (select d.section_name, jsonb_array_elements(value -> 'dataSources') ->> 'uuid' as uuid
                         from assessment_fra_2025.descriptions d
                         where d.value -> 'dataSources' is not null)
    update
        assessment_fra_2025.message_topic mt
    set
        section_uuid = s.uuid
    from datasources left join assessment_fra.section s on section_name = s.props ->> 'name'
        where datasources.uuid = mt.key;
        `)
}
