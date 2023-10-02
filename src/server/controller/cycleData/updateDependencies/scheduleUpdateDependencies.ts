import { Job, JobsOptions } from 'bullmq'

import { Logger } from 'server/utils/logger'

import { UpdateDependenciesProps } from './props'
import { UpdateDependenciesQueueFactory } from './queueFactory'

const jobOptions: JobsOptions = {
  attempts: 5,
  backoff: { delay: 1000, type: 'fixed' },
  removeOnComplete: true,
  removeOnFail: 3,
}

export const scheduleUpdateDependencies = (props: UpdateDependenciesProps): Promise<Job<UpdateDependenciesProps>> => {
  const { assessment, cycle, nodeUpdates } = props
  const { countryIso, nodes } = nodeUpdates

  Logger.debug(`[scheduleUpdateDependencies] ${countryIso} ${nodes.length} nodes added to updateDependencies queue`)

  const queue = UpdateDependenciesQueueFactory.getInstance({ assessment, cycle, countryIso })
  return queue.add('updateDependencies', props, jobOptions)
}
