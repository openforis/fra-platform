import { RepositoryItem } from 'meta/cycleData'

export type RepositoryState = {
  loading: boolean
  repositoryItem?: RepositoryItem
}

export const initialState: RepositoryState = {
  loading: false,
}
