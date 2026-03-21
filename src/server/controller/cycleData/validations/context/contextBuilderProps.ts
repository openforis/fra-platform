import { Country } from 'meta/area/country'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { NodeUpdates } from 'meta/data/nodeUpdates'

export type ContextBuilderProps = {
  assessment: Assessment
  country: Country
  cycle: Cycle
  nodeUpdates: NodeUpdates
}
