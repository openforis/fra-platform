import { AssessmentNames } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle(
    {
      assessmentName: AssessmentNames.panEuropean,
      cycleName: '2025',
    },
    client
  )

  const schemaAssessment = Schemas.getName(assessment)

  // remove rows validation
  await client.query(`
      update ${schemaAssessment}.row r
      set props = jsonb_delete(r.props, 'validateFns')
      from (select r.id
            from ${schemaAssessment}.row r
                     left join ${schemaAssessment}."table" t on t.id = r.table_id
            where t.props ->> 'name' = 'table_4_2a'
              and r.props ->> 'variableName' is not null) as src
      where r.id = src.id
      ;
  `)

  // set cols validation
  await client.query(`
      update ${schemaAssessment}.col c
      set props = c.props || jsonb_build_object('validateFns', src.validations)
      from (select c.id
                 , jsonb_build_object(
                  '${cycle.uuid}',
                  jsonb_build_array(
                          'validatorSumSubCategoriesNotEqualToParent(' ||
                          'table_1_1a.' || (r.props ->> 'variableName')::text || '.area,' ||
                          '''panEuropean.forestArea.forest'',' ||
                          '''1.1I'',' ||
                          '[table_4_2a.' || (r.props ->> 'variableName')::text ||
                          '.natural_expansion_and_natural_regeneration, ' ||
                          'table_4_2a.' || (r.props ->> 'variableName')::text ||
                          '.afforestation_and_regeneration_by_planting_and_or_seeding],' ||
                          '[''panEuropean.totalForestAreaByExpansionAndRegenerationType.forestAreaByExpansionAndRegenerationSubcategories''],' ||
                          '''{"year":"' || split_part(r.props ->> 'variableName', '_', 2) || '"}'')'
                  )
                   ) as validations
            from ${schemaAssessment}.col c
                     left join ${schemaAssessment}.row r on r.id = c.row_id
                     left join ${schemaAssessment}."table" t on t.id = r.table_id
            where t.props ->> 'name' = 'table_4_2a'
              and r.props ->> 'variableName' is not null
              and c.props ->> 'colName' in
                  ('natural_expansion_and_natural_regeneration',
                   'afforestation_and_regeneration_by_planting_and_or_seeding')) as src
      where c.id = src.id
  `)

  await AssessmentController.generateMetaCache(client)
  await AssessmentController.generateMetadataCache({ assessment }, client)
}
