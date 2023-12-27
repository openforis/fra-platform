import { Promises } from 'utils/promises'

import { AssessmentNames } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'
import { getCreateSchemaCycleOriginalDataPointViewDDL } from 'server/repository/assessment/assessment/getCreateSchemaDDL'

const alterTable = (_: TemplateStringsArray, schemaName: string) => {
  return `alter table if exists ${schemaName}.node_ext rename to node_ext_old;`
}

const createTable = (_: TemplateStringsArray, schemaName: string) => {
  return `
      create table ${schemaName}.node_ext
      (
          country_iso varchar(3) references country (country_iso)
              on update cascade on delete cascade,
          id          bigint generated by default as identity,
          parent_uuid uuid,
          props       jsonb                 default '{}'::jsonb,
          type        varchar(255) not null,
          uuid        uuid         not null default uuid_generate_v4(),
          value       jsonb                 default '{}'::jsonb,
          primary key (id),
          unique (uuid)
      );

      alter table ${schemaName}.node_ext
          add constraint node_ext_node_ext_uuid_fk
              foreign key (parent_uuid) references ${schemaName}.node_ext (uuid)
                  on update cascade on delete cascade;

      -- add index 1
      create index node_ext_country_iso_idx on ${schemaName}.node_ext (country_iso);
  `
}

const migrateOldData = (_: TemplateStringsArray, schemaName: string) => {
  return `
      insert into ${schemaName}.node_ext (country_iso, type, props, value)
      select
        country_iso,
        'node',
        jsonb_build_object('tableName', table_name, 'variableName', variable_name, 'colName', col_name),
        value
      from ${schemaName}.node_ext_old;
    `
}

const dropOldTable = (_: TemplateStringsArray, schemaName: string) => {
  return `
      drop table if exists ${schemaName}.node_ext_old;
    `
}

// -- only update if not already updated
const wrapWithIf = (schemaName: string, queries: string) => {
  return `
    do $$
    begin
        if exists(SELECT *
                  FROM information_schema.columns
                  WHERE table_name='node_ext' and table_schema='${schemaName}' and column_name='variable_name')
        then
           ${queries}
        end if;
    end $$;`
}

export default async (client: BaseProtocol) => {
  const assessments = await AssessmentController.getAll({}, client)

  await Promises.each(assessments, async (assessment) => {
    return Promises.each(assessment.cycles, async (cycle) => {
      const schemaCycle = Schemas.getNameCycle(assessment, cycle)
      const queries = [
        alterTable`${schemaCycle}`,
        createTable`${schemaCycle}`,
        migrateOldData`${schemaCycle}`,
        getCreateSchemaCycleOriginalDataPointViewDDL(schemaCycle),
        dropOldTable`${schemaCycle}`,
      ].join('\n')

      const query = wrapWithIf(schemaCycle, queries)

      await client.query(query)

      if (assessment.props.name === AssessmentNames.fra) {
        await AssessmentController.generateDataCache({ assessment, cycle, force: true }, client)
      }
    })
  })
}