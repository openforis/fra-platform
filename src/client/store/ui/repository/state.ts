import { RepositoryItem } from 'meta/cycleData'
import { RepositoryItemValidation } from 'meta/cycleData/repository'

export type RepositoryState = {
  loading: boolean
  repositoryItem?: Partial<RepositoryItem>
  repositoryItems?: Array<RepositoryItem>
  repositoryItemValidation?: RepositoryItemValidation
}

export const initialState: RepositoryState = {
  loading: false,
}
