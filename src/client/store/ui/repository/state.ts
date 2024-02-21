import { RepositoryItem } from 'meta/cycleData'
import { RepositoryItemValidation } from 'meta/cycleData/repository'
import { File } from 'meta/file'

export type RepositoryState = {
  loading: boolean
  repositoryItem?: Partial<RepositoryItem>
  repositoryItemValidation?: RepositoryItemValidation
  file?: Omit<File, 'buffer'>
}

export const initialState: RepositoryState = {
  loading: false,
}
