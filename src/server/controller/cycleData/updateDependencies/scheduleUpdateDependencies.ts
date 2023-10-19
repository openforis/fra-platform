import { Job, JobsOptions } from 'bullmq'

import { AssessmentMetaCaches } from 'meta/assessment'

import { Logger } from 'server/utils/logger'

import { UpdateDependenciesProps } from './props'
import { UpdateDependenciesQueueFactory } from './queueFactory'

const jobOptions: JobsOptions = {
  attempts: 5,
  backoff: { delay: 1000, type: 'fixed' },
  removeOnComplete: true,
  removeOnFail: 3,
}

export const scheduleUpdateDependencies = (
  props: UpdateDependenciesProps
): Promise<Job<UpdateDependenciesProps>> | undefined => {
  const { assessment, cycle, nodeUpdates } = props
  const { countryIso, nodes } = nodeUpdates

  Logger.debug(`[scheduleUpdateDependencies] ${countryIso} ${nodes.length} nodes added to updateDependencies queue`)

  // avoid adding to queue when updating single node with no dependants. (the queue will be empty)
  if (nodes.length === 1) {
    const { tableName, variableName } = nodes[0]
    const dependants = AssessmentMetaCaches.getCalculationsDependants({ assessment, cycle, tableName, variableName })
    if (dependants.length === 0) {
      return undefined
    }
  }

  const queue = UpdateDependenciesQueueFactory.getInstance({ assessment, cycle, countryIso })
  return queue.add('updateDependencies', props, jobOptions)
}
