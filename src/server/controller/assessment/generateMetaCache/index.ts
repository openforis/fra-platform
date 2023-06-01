import { Objects } from '@utils/objects'

import { Assessment, AssessmentMetaCache, AssessmentNames, Col, Cycle, Row, TableNames } from '@meta/assessment'
import { VariablesByTableCache } from '@meta/assessment/assessmentMetaCache'

import { BaseProtocol, Schemas } from '@server/db'

import { DependencyEvaluator } from './dependencyEvaluator'

type Props = {
  assessment: Assessment
  cycle: Cycle
}

export const generateMetaCache = async (props: Props, client: BaseProtocol): Promise<void> => {
  const { assessment, cycle } = props
  const schema = Schemas.getName(assessment)

  // TODO: Removed for easier testing. Rollback!
  if (assessment.props.name === AssessmentNames.panEuropean) {
    return
  }

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
              and t.props -> 'cycles' ? '${cycle.uuid}'
              and r.props -> 'cycles' ? '${cycle.uuid}'
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
          from ${Schemas.getNameCycle(assessment, cycle)}.value_aggregate v
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
           or (c.props -> 'calculateFn' is not null and c.props -> 'calculateFn' ->> '${cycle.uuid}' is not null)
           or (c.props -> 'validateFns' is not null and c.props -> 'validateFns' ->> '${cycle.uuid}' is not null)
        group by r.id, r.uuid, r.props, t.props ->> 'name'`,
    [],
    (row) => {
      return {
        ...Objects.camelize(row),
        cols: row.cols.map((col: Col) => {
          return {
            ...Objects.camelize(col),
            props: {
              ...Objects.camelize(col.props),
              calculateFn: col.props.calculateFn,
              validateFns: col.props.validateFns,
            },
          }
        }),
        props: {
          ...Objects.camelize(row.props),
          calculateFn: row.props.calculateFn,
          linkToSection: row.props.linkToSection,
          validateFns: row.props.validateFns,
          chart: row.props.chart,
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
        if (col.props.calculateFn?.[cycle.uuid]) {
          DependencyEvaluator.evalDependencies(col.props.calculateFn[cycle.uuid], { ...context, type: 'calculations' })
        }
      })
    }

    if (row.props.validateFns?.[cycle.uuid]) {
      row.props.validateFns[cycle.uuid].forEach((validateFn) =>
        DependencyEvaluator.evalDependencies(validateFn, { ...context, type: 'validations' })
      )
    } else {
      row.cols.forEach((col) => {
        if (col.props.validateFns?.[cycle.uuid]) {
          col.props.validateFns?.[cycle.uuid].forEach((validateFn) => {
            DependencyEvaluator.evalDependencies(validateFn, { ...context, type: 'validations' })
          })
        }
      })
    }
  })

  return client.query(
    `
        update assessment
        set meta_cache = jsonb_set(meta_cache, '{${cycle.uuid}}', $1::jsonb)
        where id = $2
    `,
    [JSON.stringify(assessmentMetaCache), assessment.id]
  )
}
