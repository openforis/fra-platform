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
    return { name: 'validation.repositoryItem.repositoryValidationName' }
  }

  if (!fileUuid && !link) {
    return {
      file: 'validation.repositoryItem.repositoryValidationFileOrLink',
      link: 'validation.repositoryItem.repositoryValidationFileOrLink',
    }
  }

  if (fileUuid && link) {
    return {
      file: 'validation.repositoryItem.repositoryValidationEitherFileOrLink',
      link: 'validation.repositoryItem.repositoryValidationEitherFileOrLink',
    }
  }

  return undefined
}
export const RepositoryItemValidator = {
  validate,
}
