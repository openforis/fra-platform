import { AssessmentNames } from 'meta/assessment/assessment'
import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

const assessmentName = AssessmentNames.fra
const cycleName = '2025'
const countryIso = 'DZA'
const sectionName = 'designatedManagementObjective'
const descriptionName = CommentableDescriptionName.originalData

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle({
    assessmentName,
    cycleName,
  })
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  await client.query(
    `update ${schemaCycle}.descriptions
     set value = jsonb_set(
       value,
       '{text}',
       to_jsonb(
         replace(
           value->>'text',
           E',\\u00A0ce\\u00A0qui\\u00A0représente\\u00A0',
           ', ce qui représente '
         )
       )
     )
     where section_name = $1
       and country_iso  = $2
       and name         = $3;
    `,
    [sectionName, countryIso, descriptionName]
  )
}
