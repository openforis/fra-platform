import { ColType } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

export default async (client: BaseProtocol) => {
  const assessments = await AssessmentController.getAll({}, client)

  await Promise.all(
    assessments.map(async (assessment) => {
      const schemaAssessment = Schemas.getName(assessment)

      await client.query(`
          with col_props as
                   (select c.id
                         , c.props -> 'select' #- '{options}' ||
                           jsonb_build_object('years', jsonb_build_object('start', 1980)) as select_props
                    from ${schemaAssessment}.col c
                             left join ${schemaAssessment}.row r on r.id = c.row_id
                             left join ${schemaAssessment}."table" t on t.id = r.table_id
                    where t.props ->> 'name' = 'growingStockComposition2025'
                      and c.props ->> 'colName' = 'mostRecentYear')
          update ${schemaAssessment}.col c
          set props = c.props || jsonb_build_object('select', cp.select_props)
          from col_props cp
          where c.id = cp.id
          ;

          with col_props_disagg as
              (select c.id
                    , jsonb_array_elements_text(c.props -> 'cycles') as cycle_uuid
                    , c.props -> 'select'                            as select_props
               from ${schemaAssessment}.col c
                        left join ${schemaAssessment}.row r on r.id = c.row_id
                        left join ${schemaAssessment}."table" t on t.id = r.table_id
               where c.props ->> 'colType' in ('multiselect','${ColType.select}')
               order by c.id)
             , col_props as
              (select cp.id
                    , jsonb_object_agg(cp.cycle_uuid, cp.select_props) as select_props
               from col_props_disagg cp
               group by cp.id)
          update ${schemaAssessment}.col c
          set props = c.props || jsonb_build_object('select', cp.select_props)
          from col_props cp
          where c.id = cp.id
          ;
      `)

      await AssessmentController.generateMetadataCache({ assessment }, client)
    })
  )
}
