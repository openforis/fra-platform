import { Assessment } from '../../../meta/assessment/assessment'
import { Row } from '../../../meta/assessment/row'
import { Col } from '../../../meta/assessment/col'
import { VariablesByTableCache, AssessmentMetaCache } from '../../../meta/assessment/assessmentMetaCache'
import { BaseProtocol } from '../../../server/db'
import { DBNames } from '../_DBNames'
import { Objects } from '../../../core/utils'
import { ExpressionEvaluator } from './expressionEvaluator'

type Props = {
  assessment: Assessment
}

export const generateMetaCache = async (props: Props, client: BaseProtocol): Promise<void> => {
  const { assessment } = props
  const schema = DBNames.getAssessmentSchema(assessment.props.name)

  const variablesByTable = await client.one<VariablesByTableCache>(
    `
        with data as (
            select t.props ->> 'name' as table_name,
                   jsonb_object_agg(
                               r.props ->> 'variableName',
                               jsonb_build_object(
                                       'variableName', r.props ->> 'variableName', 'tableName', t.props ->> 'name'
                                   )) as variables
            from ${schema}.row r
                     left join ${schema}."table" t on r.table_id = t.id
            where r.props ->> 'variableName' is not null
            group by t.props ->> 'name'
        )
        select jsonb_object_agg(data.table_name, data.variables) as cache
        from data
    `,
    [],
    ({ cache }) => cache
  )

  const assessmentMetaCache: AssessmentMetaCache = {
    calculations: {
      dependants: {},
      dependencies: {},
    },
    variablesByTable,
  }

  const rows = await client.map<Row & { tableName: string; cols: Array<Col> }>(
    `
        select r.*,
               t.props ->> 'name' as table_name,
               jsonb_agg(c.*)     as cols
        from ${schema}.row r
                 left join ${schema}."table" t
                           on r.table_id = t.id
                 left join ${schema}.col c on r.id = c.row_id
        where r.props ->> 'calculateFn' is not null
           or c.props ->> 'calculateFn' is not null
        group by r.id, r.uuid, r.props, t.props ->> 'name'`,
    [],
    // @ts-ignore
    Objects.camelize
  )

  rows.forEach(({ tableName, ...row }) => {
    const context = { row, tableName, assessmentMetaCache }
    if (row.props.calculateFn) {
      ExpressionEvaluator.evalDependencies(row.props.calculateFn, context)
    } else {
      row.cols.forEach((col) => {
        if (col.props.calculateFn) {
          ExpressionEvaluator.evalDependencies(col.props.calculateFn, context)
        }
      })
    }
  })

  return client.query(
    `update assessment
     set meta_cache = $1::jsonb`,
    JSON.stringify(assessmentMetaCache)
  )
}
