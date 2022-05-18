import { Assessment } from '../../../meta/assessment/assessment'
import { BaseProtocol } from '../../../server/db'
import { DBNames } from '../_DBNames'

// tableName -> rowIndex -> rowUuid

export type TableRows = Record<string, Record<string, string>>

export const getTableRows = async (props: { assessment: Assessment }, client: BaseProtocol): Promise<TableRows> => {
  const { assessment } = props
  const assessmentSchema = DBNames.getAssessmentSchema(assessment.props.name)
  return client.one<TableRows>(
    `
        with t as (
            select t.props ->> 'name'                            as table_name,
                   jsonb_object_agg(r.props ->> 'index', r.uuid) as rows
            from ${assessmentSchema}.row r
                     left join ${assessmentSchema}."table" t
                               on r.table_id = t.id
            where r.props ->> 'variableName' is not null
            group by 1)
        select jsonb_object_agg(t.table_name, t.rows) as data
        from t
        ;
    `,
    [],
    ({ data }) => data
  )
}
