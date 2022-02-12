import { Assessment, AssessmentMetaCache, Row } from '../../../meta/assessment'
import { BaseProtocol } from '../../../server/db'
import { DBNames } from '../_DBNames'
import { Objects } from '../../../core/utils'
import { ExpressionEvaluator } from './expressionEvaluator'
import { VariablesByTableCache } from '../../../meta/assessment/assessmentMetaCache'

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
                                       'name', r.props ->> 'variableName', 'tableName', t.props ->> 'name'
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

  const rows = await client.map<Row & { tableName: string }>(
    `
        select r.*, t.props->>'name' as table_name
        from ${schema}.row r
        left join ${schema}."table" t
            on r.table_id = t.id
        where r.props ->> 'calculateFn' is not null`,
    [],
    // @ts-ignore
    Objects.camelize
  )

  rows.forEach(({ tableName, ...row }) => {
    ExpressionEvaluator.evalDependencies({ row, tableName, assessmentMetaCache })
  })

  return client.query(
    `update assessment
     set meta_cache = $1::jsonb`,
    JSON.stringify(assessmentMetaCache)
  )
}
