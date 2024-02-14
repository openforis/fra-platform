import { RepositoryItem } from 'meta/cycleData'

export type RepositoryState = {
  loading: boolean
  repositoryItem?: Partial<RepositoryItem>
  repositoryItems?: Array<RepositoryItem>
}

export const initialState: RepositoryState = {
  loading: false,
}
