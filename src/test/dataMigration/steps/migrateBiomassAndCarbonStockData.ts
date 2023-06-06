import { Assessment } from 'meta/assessment'

import { BaseProtocol, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
}

export const migrateBiomassAndCarbonStockData = async (props: Props, client: BaseProtocol): Promise<void> => {
  const { assessment } = props

  const cycle2020 = assessment.cycles.find((c) => c.name === '2020')
  const cycle2025 = assessment.cycles.find((c) => c.name === '2025')
  const schemaAssessment = Schemas.getName(assessment)
  const schemaCycle2020 = Schemas.getNameCycle(assessment, cycle2020)
  const schemaCycle2025 = Schemas.getNameCycle(assessment, cycle2025)

  await client.query(`
      insert into ${schemaCycle2025}.node (country_iso, row_uuid, col_uuid, value)
      select source.country_iso,
--        source.variable_name,
             target.row_uuid,
--        source.col_name,
             target.col_uuid,
             source.value
      from (select n.country_iso,
                   r.uuid                     as row_uuid,
                   r.props ->> 'variableName' as variable_name,
                   c.uuid                     as col_uuid,
                   c.props ->> 'colName'      as col_name,
                   n.value
            from ${schemaCycle2020}.node n
                     left join ${schemaAssessment}.row r
                               on n.row_uuid = r.uuid
                     left join ${schemaAssessment}.col c
                               on n.col_uuid = c.uuid
                     left join ${schemaAssessment}."table" t
                               on t.id = r.table_id
            where t.props ->> 'name' = 'biomassStock'
              and c.props ->> 'colName' in ('1990', '2000', '2010', '2015', '2020')) as source
               left join (select r.uuid                     as row_uuid,
                                 r.props ->> 'variableName' as variable_name,
                                 c.uuid                     as col_uuid,
                                 c.props ->> 'colName'      as col_name
                          from ${schemaAssessment}.col c
                                   left join ${schemaAssessment}.row r
                                             on c.row_id = r.id
                                   left join ${schemaAssessment}."table" t
                                             on t.id = r.table_id
                          where t.props ->> 'name' = 'biomassStockAvg'
                            and c.props ->> 'colName' in ('1990', '2000', '2010', '2015', '2020')) as target
                         on source.col_name = target.col_name
                             and source.variable_name = target.variable_name
      ;

      insert into ${schemaCycle2025}.node (country_iso, row_uuid, col_uuid, value)
      select source.country_iso,
--        source.variable_name,
             target.row_uuid,
--        source.col_name,
             target.col_uuid,
             source.value
      from (select n.country_iso,
                   r.uuid                     as row_uuid,
                   r.props ->> 'variableName' as variable_name,
                   c.uuid                     as col_uuid,
                   c.props ->> 'colName'      as col_name,
                   n.value
            from ${schemaCycle2020}.node n
                     left join ${schemaAssessment}.row r
                               on n.row_uuid = r.uuid
                     left join ${schemaAssessment}.col c
                               on n.col_uuid = c.uuid
                     left join ${schemaAssessment}."table" t
                               on t.id = r.table_id
            where t.props ->> 'name' = 'carbonStock'
              and c.props ->> 'colName' in ('1990', '2000', '2010', '2015', '2020')) as source
               left join (select r.uuid                     as row_uuid,
                                 r.props ->> 'variableName' as variable_name,
                                 c.uuid                     as col_uuid,
                                 c.props ->> 'colName'      as col_name
                          from ${schemaAssessment}.col c
                                   left join ${schemaAssessment}.row r
                                             on c.row_id = r.id
                                   left join ${schemaAssessment}."table" t
                                             on t.id = r.table_id
                          where t.props ->> 'name' = 'carbonStockAvg'
                            and c.props ->> 'colName' in ('1990', '2000', '2010', '2015', '2020')) as target
                         on source.col_name = target.col_name
                             and source.variable_name = target.variable_name
      ;
  `)
}
