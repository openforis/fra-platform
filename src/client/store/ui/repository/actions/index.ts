import { getFileMeta } from 'client/store/ui/repository/actions/getFileMeta'
import { removeFile } from 'client/store/ui/repository/actions/removeFile'
import { removeRepositoryItem } from 'client/store/ui/repository/actions/removeRepositoryItem'
import { upsertRepositoryItem } from 'client/store/ui/repository/actions/upsertRepositoryItem'
import { RepositorySlice } from 'client/store/ui/repository/slice'

export const RepositoryActions = {
  ...RepositorySlice.actions,
  getFileMeta,
  removeRepositoryItem,
  removeFile,
  upsertRepositoryItem,
}
