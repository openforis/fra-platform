import { Job } from 'bullmq'

import { Logger } from '@server/utils/logger'

import { UpdateDependenciesProps } from './props'
import { UpdateDependenciesQueueFactory } from './queueFactory'

export const scheduleUpdateDependencies = (props: UpdateDependenciesProps): Promise<Job<UpdateDependenciesProps>> => {
  const { nodeUpdates } = props
  const { assessment, cycle, countryIso } = nodeUpdates
  Logger.debug(`[scheduleUpdateDependencies] ${nodeUpdates.nodes.length} nodes added to updateDependencies queue`)

  return UpdateDependenciesQueueFactory.getInstance({ assessment, cycle, countryIso }).add(
    'updateDependencies',
    props,
    { removeOnComplete: true }
  )
}
