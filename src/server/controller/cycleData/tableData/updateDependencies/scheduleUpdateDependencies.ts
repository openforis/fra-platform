import { Job, JobsOptions } from 'bullmq'

import { AssessmentMetaCaches } from 'meta/assessment/metaCaches'

import { UpdateDependenciesProps } from 'server/controller/cycleData/tableData/updateDependencies/props'
import { UpdateDependenciesQueueFactory } from 'server/controller/cycleData/tableData/updateDependencies/queueFactory'
import { Logger } from 'server/utils/logger'

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

  // avoid adding to queue when updating nodes without dependants. (the queue will be empty)
  const dependants = nodes.flatMap(({ tableName, variableName }) =>
    AssessmentMetaCaches.getCalculationsDependants({ assessment, cycle, tableName, variableName })
  )
  if (dependants.length === 0) {
    return undefined
  }

  const queue = UpdateDependenciesQueueFactory.getInstance({ assessment, cycle, countryIso })
  return queue.add('updateDependencies', props, jobOptions)
}
