import { AssessmentNames } from 'meta/assessment/assessmentName'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'
import { TableRepository } from 'server/repository/assessment/table'
import { DataRepository } from 'server/repository/assessmentCycle/data'

const assessmentName = AssessmentNames.panEuropean
const cycleName = '2025'
const metaCache = true
const tableName = 'table_1_2c'

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle(
    { assessmentName, cycleName, metaCache },
    client
  )
  const schemaAssessment = Schemas.getName(assessment)

  // 1. fix col names
  const ids = await client.map<number>(
    `
        with data as
        (select s.props ->> 'name' as section_name
           , t.props ->> 'name' as table_name
           , r.props ->> 'variableName' as variable_name
           , c.id as col_id
           , c.props ->> 'colName' as col_name
           , c.props ->> 'index' as col_index
           , row_number()
            OVER (
            PARTITION BY
            s.props ->> 'name'
           , t.props ->> 'name'
           , r.props ->> 'variableName'
           , c.props ->> 'colName'
            order by c.props ->> 'index'
            ) AS row_number
        from ${schemaAssessment}.col c
            left join ${schemaAssessment}.row r on r.id = c.row_id
            left join ${schemaAssessment}."table" t on t.id = r.table_id
            left join ${schemaAssessment}.table_section ts on t.table_section_id = ts.id
            left join ${schemaAssessment}.section s on ts.section_id = s.id
        where s.props ->> 'name' = 'growingStock'
          and t.props ->> 'name' = 'table_1_2c'
          and c.props ->> 'colName' = 'growing_stock_in_forest_2015'
        order by 1, 2, 3)
        select d.col_id as id
        from data d
        where d.row_number = 2
        ;
    `,
    [],
    ({ id }) => id
  )

  await client.query(`
      update ${schemaAssessment}.col c
      set props = props || jsonb_build_object('colName', 'growing_stock_in_forest_2025')
      where c.id in (${ids.join(', ')});
  `)

  // 2. update data view
  const table = await TableRepository.getOne({ assessment, cycle, tableName }, client)
  await DataRepository.createOrReplaceTableDataView({ assessment, cycle, table })

  // 3. update metacache e metadata redis cache
  await AssessmentController.generateMetaCache(client)
  await AssessmentController.generateMetadataCache({ assessment }, client)

  // 4. update data cache
  await AssessmentController.generateDataCache({ assessment, cycle, force: true }, client)
}
