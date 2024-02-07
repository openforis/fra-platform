import { AssessmentNames } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

const assessmentName = AssessmentNames.panEuropean

export default async (client: BaseProtocol) => {
  const assessment = await AssessmentController.getOne({ assessmentName }, client)

  const schemaAssessment = Schemas.getName(assessment)

  await client.query(`
      update ${schemaAssessment}.col c
      set props = src.col_props
      from (select s.props ->> 'name'                          as section_name
                 , t.props ->> 'name'                          as table_name
                 , t.id                                        as table_id
                 , r.props ->> 'variableName'                  as variable_name
                 , c.props ->> 'colName'                       as col_name
                 , c.id                                        as col_id
                 , jsonb_delete_path(c.props, '{validateFns}') as col_props
            from ${schemaAssessment}.col c
                     left join ${schemaAssessment}.row r on r.id = c.row_id
                     left join ${schemaAssessment}."table" t on t.id = r.table_id
                     left join ${schemaAssessment}.table_section ts on ts.id = t.table_section_id
                     left join ${schemaAssessment}.section s on s.id = ts.section_id
            where s.props ->> 'name' = 'introducedTreeSpecies'
              and t.props ->> 'name' = 'table_4_4b'
              and r.props ->> 'variableName' is not null
              and c.props ->> 'colName' is not null
            order by 1, 2, 3, 4, 5) as src
      where c.id = src.col_id
  `)

  await AssessmentController.generateMetaCache(client)
  await AssessmentController.generateMetadataCache({ assessment }, client)
}
