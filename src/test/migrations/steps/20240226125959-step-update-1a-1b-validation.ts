import { AssessmentNames } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle(
    { assessmentName: AssessmentNames.fra, cycleName: '2025' },
    client
  )

  const schemaAssessment = Schemas.getName(assessment)

  await client.query(`
      update ${schemaAssessment}.row r
      set props = jsonb_set(r.props, '{validateFns,${cycle.uuid}}', src.validate_fns, true)
      from (select r.id
                 , coalesce(r.props -> 'validateFns' -> '${cycle.uuid}', jsonb_build_array()) ||
                   jsonb_build_array(
                           'validatorGreaterThanOrZero(' || (t.props ->> 'name') || '.' ||
                           (r.props ->> 'variableName') || ')'
                   ) as validate_fns
            from ${schemaAssessment}.row r
                     left join ${schemaAssessment}."table" t on t.id = r.table_id
            where t.props ->> 'name' in ('extentOfForest', 'forestCharacteristics')
              and r.props ->> 'variableName' in
                  ('forestArea', 'otherWoodedLand', 'naturalForestArea', 'primaryForest', 'plantationForestArea',
                   'plantationForestIntroducedArea', 'otherPlantedForestArea')) as src
      where r.id = src.id;
  `)

  await AssessmentController.generateMetadataCache({ assessment }, client)
}
