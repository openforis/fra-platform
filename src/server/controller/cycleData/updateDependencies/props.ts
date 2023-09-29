import { NodeUpdates } from 'meta/data'
import { User } from 'meta/user'

export type UpdateDependenciesProps = {
  nodeUpdates: NodeUpdates
  user: User
  isODP?: boolean
}
