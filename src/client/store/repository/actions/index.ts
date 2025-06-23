import { getFileMeta } from 'client/store/repository/actions/getFileMeta'
import { removeRepositoryItem } from 'client/store/repository/actions/removeRepositoryItem'
import { reset } from 'client/store/repository/actions/reset'
import { setFile } from 'client/store/repository/actions/setFile'
import { setRepositoryItem } from 'client/store/repository/actions/setRepositoryItem'
import { setRepositoryItemProps } from 'client/store/repository/actions/setRepositoryItemProps'
import { upsertRepositoryItem } from 'client/store/repository/actions/upsertRepositoryItem'

export const RepositoryActions = {
  getFileMeta,
  removeRepositoryItem,
  reset,
  setRepositoryItem,
  setFile,
  setRepositoryItemProps,
  upsertRepositoryItem,
}
