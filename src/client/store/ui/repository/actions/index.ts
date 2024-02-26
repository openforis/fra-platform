import { getFileMeta } from 'client/store/ui/repository/actions/getFileMeta'
import { removeRepositoryItem } from 'client/store/ui/repository/actions/removeRepositoryItem'
import { upsertRepositoryItem } from 'client/store/ui/repository/actions/upsertRepositoryItem'
import { RepositorySlice } from 'client/store/ui/repository/slice'

export const RepositoryActions = {
  ...RepositorySlice.actions,
  getFileMeta,
  removeRepositoryItem,
  upsertRepositoryItem,
}
