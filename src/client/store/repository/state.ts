import { RepositoryItem } from 'meta/cycleData/repository/item'
import { RepositoryItemValidation } from 'meta/cycleData/repository/itemValidation'
import { FileMeta } from 'meta/file/meta'

export type RepositoryState = {
  fileMeta?: FileMeta
  loading: boolean
  repositoryItem?: Partial<RepositoryItem>
  repositoryItemValidation?: RepositoryItemValidation
}

export const initialState: RepositoryState = {
  loading: false,
}
