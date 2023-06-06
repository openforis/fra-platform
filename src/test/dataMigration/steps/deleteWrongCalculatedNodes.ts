import { Assessment, Cycle } from 'meta/assessment'

import { BaseProtocol, Schemas } from 'server/db'

export const deleteWrongCalculatedNodes = async (
  props: { assessment: Assessment; cycle: Cycle },
  client: BaseProtocol
): Promise<void> => {
  const { assessment, cycle } = props
  const schemaAssessment = Schemas.getName(assessment)
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)
  return client.query(`
      delete
      from ${schemaCycle}.node n
      where n.id in (
          select n.id
          from ${schemaCycle}.node n
                   left join ${schemaAssessment}.col c
                             on n.col_uuid = c.uuid
                   left join ${schemaAssessment}.row r
                             on r.id = c.row_id
          where r.props ->> 'variableName' in ('total_native_placeholder', 'no_unknown', 'other_or_unknown')
      );

      delete
      from ${schemaCycle}.node n
      where n.id in (
          select n.id
          from ${schemaCycle}.node n
                   left join ${schemaAssessment}.col c
                             on n.col_uuid = c.uuid
                   left join ${schemaAssessment}.row r
                             on r.id = c.row_id
                   left join ${schemaAssessment}."table" t
                             on t.id = r.table_id
          where r.props ->> 'variableName' = 'other'
            and t.props ->> 'name' = 'holderOfManagementRights'
      );

      delete
      from ${schemaCycle}.node n
      where n.id in (
          select n.id
          from ${schemaCycle}.node n
                   left join ${schemaAssessment}.col c
                             on n.col_uuid = c.uuid
                   left join ${schemaAssessment}.row r
                             on r.id = c.row_id
                   left join ${schemaAssessment}."table" t
                             on t.id = r.table_id
          where c.props ->> 'colName' = 'percentOfForestArea2015Default'
            and t.props ->> 'name' = 'climaticDomain'
      );
  `)
}
