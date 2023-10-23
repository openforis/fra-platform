import { Assessment, AssessmentMetaCache, Cycle } from 'meta/assessment'

import { BaseProtocol } from 'server/db'
import { RowRepository } from 'server/repository/assessment/row'
import { ValueAggregateRepository } from 'server/repository/assessmentCycle/valueAggregate'

import { DependencyEvaluator } from './dependencyEvaluator'

type Props = {
  assessment: Assessment
  cycle: Cycle
}

export const generateMetaCache = async (props: Props, client: BaseProtocol): Promise<void> => {
  const { assessment, cycle } = props

  const [variables, valueAggregate] = await Promise.all([
    RowRepository.getVariablesCache({ assessment, cycle }, client),
    ValueAggregateRepository.getVariablesCache({ assessment, cycle }, client),
  ])

  const assessmentMetaCache: AssessmentMetaCache = {
    calculations: { dependants: {}, dependencies: {} },
    validations: { dependants: {}, dependencies: {} },
    variablesByTable: { ...variables, ...valueAggregate },
  }

  const rows = (await RowRepository.getManyCache({ assessment }, client)).filter(
    (row) =>
      Boolean(row.props.validateFns || row.props.calculateFn) ||
      Boolean(row.cols.find((col) => Boolean(col.props.validateFns || col.props.calculateFn)))
  )

  rows.forEach(({ tableName, ...row }) => {
    const context = { row, tableName, assessmentMetaCache }
    if (row.props.calculateFn?.[cycle.uuid]) {
      DependencyEvaluator.evalDependencies(row.props.calculateFn[cycle.uuid], { ...context, type: 'calculations' })
      if (row.props.calculateIf?.[cycle.uuid]) {
        DependencyEvaluator.evalDependencies(row.props.calculateIf[cycle.uuid], { ...context, type: 'calculations' })
      }
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
