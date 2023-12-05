import { AssessmentNames } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

const assessmentName = AssessmentNames.fra
const cycleName = '2025'

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName }, client)

  const schemaAssessment = Schemas.getName(assessment)

  await client.query(`
      update ${schemaAssessment}.col c
      set props = upd.props
      from (select c.id,
                   jsonb_set(
                           c.props,
                           '{style,${cycle.uuid}}',
                           '{
                             "width": "80px",
                             "minWidth": "unset",
                             "maxWidth": "unset"
                           }'
                       ) as props
            from ${schemaAssessment}.col c
                     left join ${schemaAssessment}.row r on r.id = c.row_id
                     left join ${schemaAssessment}."table" t on t.id = r.table_id
            where t.props ->> 'name' = 'nonWoodForestProductsRemovals'
              and (r.props ->> 'variableName' is null or r.props ->> 'variableName' like 'product%')
              and c.props ->> 'colType' = 'header'
              and (c.props ->> 'index' in ('0', 'header_0'))) as upd
      where c.id = upd.id;
  `)

  await AssessmentController.generateMetadataCache({ assessment }, client)
}
