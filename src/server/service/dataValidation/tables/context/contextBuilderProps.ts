import { Country } from 'meta/area/country'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { NodeUpdates } from 'meta/data/nodeUpdates'

import { BaseProtocol } from 'server/db/db'

export type ContextBuilderProps = {
  assessment: Assessment
  client: BaseProtocol
  country: Country
  cycle: Cycle
  nodeUpdates: NodeUpdates
}
