import { ColType } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

export default async (client: BaseProtocol) => {
  const assessments = await AssessmentController.getAll({}, client)

  await Promise.all(
    assessments.map(async (assessment) => {
      const schemaAssessment = Schemas.getName(assessment)

      await client.query(`
          with col_props_disagg as
              (select c.id
                    , jsonb_object_keys(c.props -> 'select') as cycle_uuid
                    , (c.props -> 'select' -> jsonb_object_keys(c.props -> 'select')) ||
                      jsonb_build_object('isMulti', true)    as select_props
               from ${schemaAssessment}.col c
                        left join ${schemaAssessment}.row r on r.id = c.row_id
                        left join ${schemaAssessment}."table" t on t.id = r.table_id
               where c.props ->> 'colType' = 'multiselect')
             , col_props as
              (select cp.id
                    , jsonb_object_agg(cp.cycle_uuid, cp.select_props) as select_props
               from col_props_disagg cp
               group by cp.id)
          update ${schemaAssessment}.col c
          set props = props || jsonb_build_object('colType', '${ColType.select}') || jsonb_build_object('select', cp.select_props)
          from col_props cp
          where c.id = cp.id
          ;
      `)

      await AssessmentController.generateMetadataCache({ assessment }, client)
    })
  )
}
