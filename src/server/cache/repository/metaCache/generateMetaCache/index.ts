import { Assessment, AssessmentName } from 'meta/assessment/assessment'
import { Assessments } from 'meta/assessment/assessments'
import { AssessmentMetaCache } from 'meta/assessment/metaCache'
import { RowCache } from 'meta/assessment/rowCache'
import { Objects } from 'utils/objects'
import { Promises } from 'utils/promises'

import { AssessmentRedisRepository } from 'server/cache/repository/assessment'
import { getKeyMetaCache } from 'server/cache/repository/keys'
import { getMetaCacheEntryKey } from 'server/cache/repository/metaCache/generateMetaCache/_getMetaCacheEntryKey'
import { DependencyEvaluator } from 'server/cache/repository/metaCache/generateMetaCache/dependencyEvaluator'
import { Context } from 'server/cache/repository/metaCache/generateMetaCache/dependencyEvaluator/evalDependencies/context'
import { RedisData } from 'server/cache/repository/redisData'
import { BaseProtocol, DB } from 'server/db/db'
import { RowRepository } from 'server/db/repository/assessment/row'
import { Logger } from 'server/utils/logger'

type Props = {
  assessments?: Array<Assessment>
}

export const generateMetaCache = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  // 1. init assessments meta cache and rows
  const assessments = props.assessments ?? (await AssessmentRedisRepository.getAssessmentsList({}, client))
  const rows: Record<AssessmentName, Array<RowCache>> = {}
  await Promises.each(assessments, async (assessment) => {
    rows[assessment.props.name] = (await RowRepository.getManyCache({ assessment }, client)).filter(
      (row) =>
        Boolean(row.props.validateFns || row.props.calculateFn) ||
        Boolean(row.cols.find((col) => Boolean(col.props.validateFns || col.props.calculateFn || col.props.enableIf)))
    )

    // init cycle meta cache
    await Promises.each(assessment.cycles, async (cycle) => {
      const variables = await RowRepository.getVariablesCache({ assessment, cycle }, client)
      const metaCache: AssessmentMetaCache = {
        calculations: { dependants: {}, dependencies: {} },
        validations: { dependants: {}, dependencies: {} },
        enablers: { dependants: {}, dependencies: {} },
        variablesByTable: { ...variables },
      }
      Objects.setInPath({ obj: assessment, path: ['metaCache', cycle.uuid], value: metaCache })
    })
  })

  // 2. generate assessments meta cache
  const recordAssessments = Assessments.getRecordAssessments(assessments)
  assessments.forEach((assessment) => {
    const assessmentName = assessment.props.name

    assessment.cycles.forEach((cycle) => {
      rows[assessmentName].forEach((row) => {
        const { name: cycleName, uuid: cycleUuid } = cycle
        const context: Omit<Context, 'type'> = { assessments: recordAssessments, cycleName, assessmentName, row }

        const calculateFn = row.props.calculateFn?.[cycleUuid]
        if (calculateFn) {
          DependencyEvaluator.evalDependencies(calculateFn, { ...context, type: 'calculations' })

          const calculateIf = row.props.calculateIf?.[cycleUuid]
          if (calculateIf) {
            DependencyEvaluator.evalDependencies(calculateIf, { ...context, type: 'calculations' })
          }
        } else {
          row.cols.forEach((col) => {
            const calculateFn = col.props.calculateFn?.[cycleUuid]
            if (col.props.cycles.includes(cycleUuid) && calculateFn) {
              DependencyEvaluator.evalDependencies(calculateFn, { ...context, type: 'calculations' })
            }
          })
        }

        row.cols.forEach((col) => {
          const validateFNs = col.props.validateFns?.[cycleUuid] ?? row.props.validateFns?.[cycleUuid]
          if (
            !Objects.isEmpty(validateFNs) &&
            !Objects.isEmpty(col.props.colName) &&
            col.props.cycles.includes(cycleUuid)
          ) {
            validateFNs.forEach((validateFn) => {
              DependencyEvaluator.evalDependencies(validateFn, { ...context, col, type: 'validations' })
            })
          }
        })

        row.cols.forEach((col) => {
          if (col.props.enableIf?.[cycleUuid]) {
            DependencyEvaluator.evalDependencies(col.props.enableIf[cycleUuid], { ...context, col, type: 'enablers' })
          }
        })
      })
    })
  })

  // set redis entries
  const redis = RedisData.getInstance()
  const key = getKeyMetaCache()
  await Promises.each(assessments, async (assessment) => {
    await Promises.each(assessment.cycles, async (cycle) => {
      const keyEntry = getMetaCacheEntryKey({ assessment, cycle })
      await redis.hmset(key, keyEntry, JSON.stringify(assessment.metaCache[cycle.uuid]))

      Logger.info(`Assessment metaCache generated: ${keyEntry}`)
    })
  })
}
