import { NodeUpdates } from 'meta/data'
import { User } from 'meta/user'

export interface PersistNodeValuesProps {
  nodeUpdates: NodeUpdates
  user: User
  sectionName: string
}
