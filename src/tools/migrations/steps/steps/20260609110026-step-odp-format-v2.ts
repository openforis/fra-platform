import { AssessmentNames } from 'meta/assessment/assessment'
import { CycleNames } from 'meta/assessment/cycle/names'
import { Promises } from 'utils/promises'

import { CacheController } from 'server/cache/controller'
import { AssessmentController } from 'server/controller/assessment'
import { DB } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

export default async (): Promise<void> => {
  const assessmentName = AssessmentNames.fra
  const assessment = await AssessmentController.getOne({ assessmentName })

  await Promises.each(assessment.cycles, async (cycle) => {
    const { name: cycleName } = cycle

    // 1. update cycle ndp props
    const version = [CycleNames._2020, CycleNames._2025].includes(cycle.name as CycleNames) ? 1 : 2

    await DB.query(
      `
          update public.assessment_cycle
          set props = jsonb_set(props, '{ndp}', jsonb_build_object('dataSources',jsonb_build_object('version',to_jsonb(${version}))), true)
          where uuid = $1;
        `,
      [cycle.uuid]
    )

    const schemaName = Schemas.getSchemaAssessmentCycle({ assessmentName, cycleName })
    // // 2. add odp.uuid column + descriptions.section_uuid
    await DB.query(`
      alter table ${schemaName}.original_data_point
        add uuid uuid default uuid_generate_v4() not null;

      alter table ${schemaName}.original_data_point
        add constraint original_data_point_uuid_unique_index unique (uuid);

      alter table ${schemaName}.descriptions
        add section_uuid uuid;

      alter table ${schemaName}.descriptions
      drop
      constraint table_name_pk_2;

      alter table ${schemaName}.descriptions
        add constraint descriptions_unique_key
          unique (country_iso, section_name, section_uuid, name);
    `)

    // 3. migrate all odp data sources
    await DB.query(`
      insert into ${schemaName}.descriptions(country_iso, section_name, section_uuid, name, value)
      select odp.country_iso
           , 'nationalDataPoint' as section_name
           , odp.uuid            as section_uuid
           , 'dataSources'       as name
           , jsonb_build_array(jsonb_build_object(
        'uuid', uuid_generate_v4(),
        'reference', odp.data_source_references,
        'type', odp.data_source_methods, 'comments',
        odp.data_source_additional_comments
                               ))
        as value
      from ${schemaName}.original_data_point odp`)

    // 4. drop odp columns
    await DB.query(`
      alter table ${schemaName}.original_data_point
      drop
      column data_source_additional_comments;

      alter table ${schemaName}.original_data_point
      drop
      column data_source_methods;

      alter table ${schemaName}.original_data_point
      drop
      column data_source_references;
    `)
  })

  await CacheController.generateAssessment({ assessmentName })
}
