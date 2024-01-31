import { createRepositoryItem } from 'client/store/ui/repository/actions/createRepositoryItem'
import { RepositorySlice } from 'client/store/ui/repository/slice'

export const RepositoryActions = {
  createRepositoryItem,
  ...RepositorySlice.actions,
}
