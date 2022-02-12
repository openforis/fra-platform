import { Assessment, AssessmentMetaCache, Row } from '../../../meta/assessment'
import { BaseProtocol } from '../../../server/db'
import { DBNames } from '../_DBNames'
import { Objects } from '../../../core/utils'
import { ExpressionEvaluator } from './expressionEvaluator'
import { VariablesCache } from './expressionEvaluator/evalDependencies/context'

type Props = {
  assessment: Assessment
}

export const generateMetaCache = async (props: Props, client: BaseProtocol): Promise<void> => {
  const { assessment } = props
  const schema = DBNames.getAssessmentSchema(assessment.props.name)

  const { cache: variablesCache } = await client.one<{ cache: VariablesCache }>(`
      with data as (
          select r.props ->> 'variableName'                                                              as variable_name,

                 jsonb_build_object('name', r.props ->> 'variableName', 'tableName', t.props ->> 'name') as variables

          from ${schema}.row r
                   left join ${schema}."table" t on r.table_id = t.id
          where r.props ->> 'variableName' is not null
--     group by t.props ->> 'name'
      )
      select jsonb_object_agg(data.variable_name, data.variables) as cache
      from data
  `)

  const assessmentMetaCache: AssessmentMetaCache = {
    calculations: {
      dependants: {},
      dependencies: {},
    },
  }

  const rows = await client.map<Row>(
    `
        select *
        from ${schema}.row r
        where r.props ->> 'calculateFn' is not null`,
    [],
    // @ts-ignore
    Objects.camelize
  )

  rows.forEach((row) => {
    ExpressionEvaluator.evalDependencies(row, assessmentMetaCache, variablesCache)
  })

  return client.query(`update assessment set meta_cache = $1::jsonb`, JSON.stringify(assessmentMetaCache))
}
