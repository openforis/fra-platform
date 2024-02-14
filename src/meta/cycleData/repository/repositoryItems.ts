import { RepositoryItem } from 'meta/cycleData/repository/repository'

type Validation =
  | {
      name?: string
      file?: string
      link?: string
    }
  | undefined

const validate = (repositoryItem: Partial<RepositoryItem>): Validation => {
  const { name, fileUuid, link } = repositoryItem || {}

  if (!name) {
    return { name: 'Name is required' }
  }

  if (!fileUuid && !link) {
    return { file: 'File or link is required', link: 'File or link is required' }
  }

  if (fileUuid && link) {
    return { file: 'Only one of file or link is required', link: 'Only one of file or link is required' }
  }

  return undefined
}
export const RepositoryItems = {
  validate,
}
