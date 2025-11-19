import { Job, Worker } from 'bullmq'

import { Country } from 'meta/area/country'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { NodeUpdates } from 'meta/data/nodeUpdates'
import { User } from 'meta/user/user'

import { BaseProtocol } from 'server/db/db'

export type UpdateDependenciesProps = {
  assessment: Assessment
  cycle: Cycle
  country: Country
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

export type UpdateDependenciesWorker = Worker<UpdateDependenciesProps, UpdateDependenciesResult>
