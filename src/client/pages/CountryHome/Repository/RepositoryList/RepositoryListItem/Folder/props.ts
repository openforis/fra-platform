import { RepositoryItemTree } from 'meta/cycleData/repository/item'

export type FolderProps = {
  isCollapsed: boolean
  onToggle: (uuid: string) => void
  repositoryItem: RepositoryItemTree
}
