import { Job } from 'bullmq'

import { Assessment, Cycle } from 'meta/assessment'
import { NodeUpdates } from 'meta/data'
import { User } from 'meta/user'

export type UpdateDependenciesProps = {
  assessment: Assessment
  cycle: Cycle
  nodeUpdates: NodeUpdates
  user: User
  includeSourceNodes?: boolean
  isODP?: boolean
}

export type UpdateDependenciesResult = {
  nodeUpdates: NodeUpdates
}

export type UpdateDependenciesJob = Job<UpdateDependenciesProps, UpdateDependenciesResult>
