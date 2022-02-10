import { Assessment, AssessmentMetaCache, Row } from '../../../meta/assessment'
import { BaseProtocol } from '../../../server/db'
import { DBNames } from '../_DBNames'
import { Objects } from '../../../core/utils'
import { ExpressionEvaluator } from './expressionEvaluator'
import { VariablesByTable } from './expressionEvaluator/evalDependencies/context'

type Props = {
  assessment: Assessment
}

export const generateMetaCache = async (props: Props, client: BaseProtocol): Promise<void> => {
  const { assessment } = props
  const schema = DBNames.getAssessmentSchema(assessment.props.name)

  const { cache: variablesByTable } = await client.one<{ cache: VariablesByTable }>(`
      with data as (
          select t.props ->> 'name'                                                       as table_name,
                 jsonb_object_agg(r.props ->> 'variableName',
                                  jsonb_build_object('name', r.props ->> 'variableName')) as variables

          from ${schema}.row r
                   left join ${schema}."table" t on r.table_id = t.id
          where r.props ->> 'variableName' is not null
          group by t.props ->> 'name'
      )
      select jsonb_object_agg(data.table_name, data.variables) as cache
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
    ExpressionEvaluator.evalDependencies(row, assessmentMetaCache, variablesByTable)
  })

  return client.query(`update assessment set meta_cache = $1::jsonb`, JSON.stringify(assessmentMetaCache))
}
