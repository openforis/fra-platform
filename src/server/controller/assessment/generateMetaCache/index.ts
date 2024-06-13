import { Objects } from 'utils/objects'
import { Promises } from 'utils/promises'

import { AssessmentMetaCache, AssessmentName, RowCache } from 'meta/assessment'

import { BaseProtocol, DB } from 'server/db'
import { AssessmentRepository } from 'server/repository/assessment/assessment'
import { RowRepository } from 'server/repository/assessment/row'

import { DependencyEvaluator } from './dependencyEvaluator'

/**
 * This method generates meta cache for all assessments
 */
export const generateMetaCache = async (client: BaseProtocol = DB): Promise<void> => {
  // 1. init assessments meta cache and rows
  const assessments = await AssessmentRepository.getAll({}, client)
  const rows: Record<AssessmentName, Array<RowCache>> = {}
  await Promises.each(assessments, async (assessment) => {
    rows[assessment.props.name] = (await RowRepository.getManyCache({ assessment }, client)).filter(
      (row) =>
        Boolean(row.props.validateFns || row.props.calculateFn) ||
        Boolean(row.cols.find((col) => Boolean(col.props.validateFns || col.props.calculateFn)))
    )

    // init cycle meta cache
    await Promises.each(assessment.cycles, async (cycle) => {
      const variables = await RowRepository.getVariablesCache({ assessment, cycle }, client)
      const metaCache: AssessmentMetaCache = {
        calculations: { dependants: {}, dependencies: {} },
        validations: { dependants: {}, dependencies: {} },
        variablesByTable: { ...variables },
      }
      Objects.setInPath({ obj: assessment, path: ['metaCache', cycle.uuid], value: metaCache })
    })
  })

  // 2. generate assessments meta cache
  assessments.forEach((assessment) => {
    const assessmentName = assessment.props.name

    assessment.cycles.forEach((cycle) => {
      const cycleName = cycle.name

      rows[assessmentName].forEach((row) => {
        const context = { assessments, assessmentName, cycleName, row }

        if (row.props.calculateFn?.[cycle.uuid]) {
          DependencyEvaluator.evalDependencies(row.props.calculateFn[cycle.uuid], { ...context, type: 'calculations' })
          if (row.props.calculateIf?.[cycle.uuid]) {
            DependencyEvaluator.evalDependencies(row.props.calculateIf[cycle.uuid], {
              ...context,
              type: 'calculations',
            })
          }
        } else {
          row.cols.forEach((col) => {
            if (col.props.calculateFn?.[cycle.uuid]) {
              DependencyEvaluator.evalDependencies(col.props.calculateFn[cycle.uuid], {
                ...context,
                type: 'calculations',
              })
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
    })
  })

  await Promise.all(
    assessments.map((assessment) =>
      client.query<void>(
        `
        update assessment
        set meta_cache = $1::jsonb
        where id = $2
    `,
        [assessment.metaCache, assessment.id]
      )
    )
  )
}
