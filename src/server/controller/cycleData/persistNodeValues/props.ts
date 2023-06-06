import { CountryIso } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'
import { NodeUpdate, NodeUpdates } from 'meta/data'
import { User } from 'meta/user'

export type PersistNodeValueProps = {
  countryIso: CountryIso
  assessment: Assessment
  cycle: Cycle
  sectionName?: string
  user: User
} & NodeUpdate

export interface PersistNodeValuesProps {
  nodeUpdates: NodeUpdates
  user: User
  sectionName: string
}
