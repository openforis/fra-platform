import { Promises } from 'utils/promises'

import { AreaController } from 'server/controller/area'
import { AssessmentController } from 'server/controller/assessment'
import { scheduleUpdateDependencies } from 'server/controller/cycleData/updateDependencies/scheduleUpdateDependencies'
import { Logger } from 'server/utils/logger'

import { ContextFactory } from './context'
import { persistResults } from './persistResults'
import { UpdateDependenciesJob } from './props'
import { updateCalculationDependencies } from './updateCalculationDependencies'

const _getLogKey = (job: UpdateDependenciesJob): string => {
  const { assessment, cycle, nodeUpdates } = job.data

  const assessmentName = assessment.props.name
  const cycleName = cycle.name
  const { countryIso } = nodeUpdates
  return `[updateDependencies-workerThread] [${[assessmentName, cycleName, countryIso].join('-')}] [job-${job.id}]`
}

export default async (job: UpdateDependenciesJob) => {
  const logKey = _getLogKey(job)
  try {
    const { user } = job.data
    const time = new Date().getTime()
    Logger.info(`${logKey} started with ${job.data.nodeUpdates.nodes.length} nodes.`)

    const context = await ContextFactory.newInstance(job.data)
    const result = updateCalculationDependencies({ context, jobId: job.id })
    await persistResults({ result, user })

    // schedule external assessment/cycle updates
    await Promises.each(context.externalDependants, async (nodeUpdates) => {
      const { assessmentName, cycleName, countryIso } = nodeUpdates
      const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName })
      const country = await AreaController.getCountry({ assessment, cycle, countryIso })
      if (country) {
        Logger.info(`${logKey} scheduling updates ${assessmentName}-${cycleName} of ${nodeUpdates.nodes.length} nodes.`)
        await scheduleUpdateDependencies({ assessment, cycle, nodeUpdates, includeSourceNodes: true, user })
      }
    })

    const resultNodeUpdates = result.nodeUpdates
    const duration = (new Date().getTime() - time) / 1000
    Logger.info(`${logKey} ended in ${duration} seconds with ${resultNodeUpdates.nodes.length} updated nodes.`)

    return { nodeUpdates: resultNodeUpdates }
  } catch (error) {
    Logger.error(`${logKey} Error.`)
    Logger.error(error)
    return Promise.reject(error)
  }
}
