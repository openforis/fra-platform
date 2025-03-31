import { Job } from 'bullmq'

import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { NodeUpdates } from 'meta/data'
import { User } from 'meta/user'

import { BaseProtocol } from 'server/db'

export type UpdateDependenciesProps = {
  assessment: Assessment
  cycle: Cycle
  nodeUpdates: NodeUpdates
  user: User
  includeSourceNodes?: boolean
  isODP?: boolean
  client?: BaseProtocol
}

export type UpdateDependenciesResult = {
  externalDependants: Array<NodeUpdates>
  nodeUpdates: NodeUpdates
}

export type UpdateDependenciesJob = Job<UpdateDependenciesProps, UpdateDependenciesResult>
