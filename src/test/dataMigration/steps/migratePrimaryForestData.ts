import { Assessment } from '@meta/assessment'

import { BaseProtocol, Schemas } from '@server/db'

type Props = {
  assessment: Assessment
}

export const migratePrimaryForestData = async (props: Props, client: BaseProtocol): Promise<void> => {
  const { assessment } = props
  const cycle2020 = assessment.cycles.find((c) => c.name === '2020')
  const cycle2025 = assessment.cycles.find((c) => c.name === '2025')
  const schemaAssessment = Schemas.getName(assessment)
  const schemaCycle2020 = Schemas.getNameCycle(assessment, cycle2020)
  const schemaCycle2025 = Schemas.getNameCycle(assessment, cycle2025)

  await client.query(`
      insert into ${schemaCycle2025}.node (country_iso, row_uuid, col_uuid, value)
      select n.country_iso,
             r2.uuid,
             c2.uuid,
             n.value
      from ${schemaCycle2020}.node n
               left join ${schemaAssessment}.row r on n.row_uuid = r.uuid
               left join ${schemaAssessment}.col c on n.col_uuid = c.uuid
               left join ${schemaAssessment}."table" t on t.id = r.table_id
               left join ${schemaAssessment}.row r2 on r2.props ->> 'variableName' = 'primaryForest'
               left join ${schemaAssessment}.col c2 on c2.props ->> 'colName' = c.props ->> 'colName' and c2.row_id = r2.id
      where t.props ->> 'name' = 'specificForestCategories'
        and r.props ->> 'variableName' = 'primary_forest'
      order by 4, 3
      ;

  `)
}
