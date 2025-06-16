import { RepositoryItem } from 'meta/cycleData'
import { RepositoryItemValidation } from 'meta/cycleData/repository'
import { FileMeta } from 'meta/file'

export type RepositoryState = {
  fileMeta?: FileMeta
  loading: boolean
  repositoryItem?: Partial<RepositoryItem>
  repositoryItemValidation?: RepositoryItemValidation
}

export const initialState: RepositoryState = {
  loading: false,
}
