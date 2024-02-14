import { getRepositoryItems } from 'client/store/ui/repository/actions/getRepositoryItems'
import { removeRepositoryItem } from 'client/store/ui/repository/actions/removeRepositoryItem'
import { upsertRepositoryItem } from 'client/store/ui/repository/actions/upsertRepositoryItem'
import { RepositorySlice } from 'client/store/ui/repository/slice'

export const RepositoryActions = {
  upsertRepositoryItem,
  removeRepositoryItem,
  getRepositoryItems,
  ...RepositorySlice.actions,
}
