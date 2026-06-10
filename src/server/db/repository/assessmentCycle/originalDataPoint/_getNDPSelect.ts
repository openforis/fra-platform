import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { TableNames } from 'meta/assessment/table'

import { Schemas } from 'server/db/schemas'

type Props = {
  assessment: Assessment
  cycle: Cycle
}

export const getNDPSelect = (props: Props): string => {
  const { assessment, cycle } = props
  const assessmentName = assessment.props.name
  const cycleName = cycle.name
  const schemaName = Schemas.getSchemaAssessmentCycle({ assessmentName, cycleName })

  return `
    select odp.id
         , odp.uuid
         , odp.country_iso
         , odp.year
         , odp.national_classes
         , odp.values
         , jsonb_build_object(
        '${TableNames.extentOfForest}', odp.comments_extentofforest,
        '${TableNames.forestCharacteristics}', odp.comments_forestcharacteristics
           )       as comments
         , coalesce(d.value, jsonb_build_array()) as data_sources
    from ${schemaName}.original_data_point odp
           left join ${schemaName}.descriptions d
                     on odp.uuid = d.section_uuid and d.name = 'dataSources'`
}
