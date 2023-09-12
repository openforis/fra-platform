import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, DB, Schemas } from 'server/db'

export default async (client: BaseProtocol) => {
  const assessments = await AssessmentController.getAll({}, client)
  const schemas = assessments.flatMap((assessment) => {
    return assessment.cycles.flatMap((cycle) => {
      const schemaCycle = Schemas.getNameCycle(assessment, cycle)
      const schemaName = Schemas.getName(assessment)
      return { schemaCycle, schemaName }
    })
  })

  // eslint-disable-next-line no-restricted-syntax
  for await (const { schemaCycle, schemaName } of schemas) {
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
  for await (const { schemaCycle, schemaName } of schemas) {
    await DB.query(`
      update
          ${schemaCycle}.message_topic mt
      set section_uuid = s.uuid
      from ${schemaName}.row r
               left join ${schemaName}.table t on r.table_id = t.id
               left join ${schemaName}.table_section ts on t.table_section_id = ts.id
               left join ${schemaName}.section s on ts.section_id = s.id
      where r.uuid::text in (select key from ${schemaCycle}.message_topic)
        and mt.key = r.uuid::text;
  `)

    await DB.query(`
      update
          ${schemaCycle}.message_topic mt
      set section_uuid = s.uuid
      from ${schemaName}.section s
      where mt.key like 'commentable-description%'
        and split_part(mt.key, '_', 4) like s.props ->> 'name';
  `)

    // update section_uuids for dataSource columns
    await DB.query(`
    with datasources as (select d.section_name, jsonb_array_elements(value -> 'dataSources') ->> 'uuid' as uuid
                         from ${schemaCycle}.descriptions d
                         where d.value -> 'dataSources' is not null)
    update
        ${schemaCycle}.message_topic mt
    set
        section_uuid = s.uuid
    from datasources left join ${schemaName}.section s on section_name = s.props ->> 'name'
        where datasources.uuid = mt.key;
        `)

    // update section_uuids for original data point
    await DB.query(`
        update
            ${schemaCycle}.message_topic mt
        set section_uuid = s.uuid
        from ${schemaName}.section s
        where s.props ->> 'name' = 'extentOfForest'
          and split_part(mt.key, '-', 2) in ('dataSourceReferences',
                                             'dataSourceMethods',
                                             'dataSourceAdditionalComments',
                                             'class')
          and split_part(mt.key, '-', 1) in (select id::text from ${schemaCycle}.original_data_point)
          and key not ilike '%class%forestCharacteristics%';
        `)

    await DB.query(`
      update ${schemaCycle}.message_topic mt
      set section_uuid = s.uuid
      from ${schemaName}.section s
      where s.props ->> 'name' = 'forestCharacteristics'
        and split_part(mt.key, '-', 1) in (select id::text from ${schemaCycle}.original_data_point)
      and mt.key ilike '%class%forestCharacteristics%';
    `)
  }
}
