import { Cycle } from '../../../src/meta/assessment'
import { Assessment } from '../../../src/meta/assessment/assessment'
import { AssessmentMetaCache, VariablesByTableCache } from '../../../src/meta/assessment/assessmentMetaCache'
import { Col } from '../../../src/meta/assessment/col'
import { Row } from '../../../src/meta/assessment/row'
import { TableNames } from '../../../src/meta/assessment/table'
import { BaseProtocol } from '../../../src/server/db'
import { Objects } from '../../../src/utils'
import { DBNames } from '../_DBNames'
import { DependencyEvaluator } from './dependencyEvaluator'

type Props = {
  assessment: Assessment
  cycle: Cycle
}

export const generateMetaCache = async (props: Props, client: BaseProtocol): Promise<void> => {
  const { assessment, cycle } = props
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

  const { data } = await client.one(`
      with v as (
          select distinct v.variable_name,
                          jsonb_build_object('tableName', 'value_aggregate', 'variableName', v.variable_name) as var
          from ${DBNames.getCycleSchema(assessment.props.name, '2020')}.value_aggregate v
      )
      select jsonb_object_agg(v.variable_name, v.var order by v.variable_name) as data
      from v
  `)

  const assessmentMetaCache: AssessmentMetaCache = {
    calculations: {
      dependants: {},
      dependencies: {},
    },
    validations: {
      dependants: {},
      dependencies: {},
    },
    variablesByTable: {
      ...variablesByTable,
      [TableNames.valueAggregate]: data,
    },
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
        where (r.props -> 'calculateFn' is not null and r.props -> 'calculateFn' ->> '${cycle.uuid}' is not null)
           or (r.props -> 'validateFns' is not null and r.props -> 'validateFns' ->> '${cycle.uuid}' is not null)
           or c.props ->> 'calculateFn' is not null
        group by r.id, r.uuid, r.props, t.props ->> 'name'`,
    [],
    // @ts-ignore
    (row) => {
      return {
        ...Objects.camelize(row),
        props: {
          ...Objects.camelize(row.props),
          calculateFn: row.props.calculateFn,
          validateFns: row.props.validateFns,
        },
      }
    }
  )

  rows.forEach(({ tableName, ...row }) => {
    const context = { row, tableName, assessmentMetaCache }
    if (row.props.calculateFn?.[cycle.uuid]) {
      DependencyEvaluator.evalDependencies(row.props.calculateFn[cycle.uuid], { ...context, type: 'calculations' })
    } else {
      row.cols.forEach((col) => {
        if (col.props.calculateFn) {
          DependencyEvaluator.evalDependencies(col.props.calculateFn, { ...context, type: 'calculations' })
        }
      })
    }

    if (row.props.validateFns?.[cycle.uuid]) {
      row.props.validateFns[cycle.uuid].forEach((validateFn) =>
        DependencyEvaluator.evalDependencies(validateFn, { ...context, type: 'validations' })
      )
    }
  })

  return client.query(
    `
        update assessment
        set meta_cache = jsonb_set(meta_cache, '{${cycle.uuid}}', $1::jsonb)
    `,
    JSON.stringify(assessmentMetaCache)
  )
}
