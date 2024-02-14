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
    return { name: 'generalValidation.repositoryValidationName' }
  }

  if (!fileUuid && !link) {
    return {
      file: 'generalValidation.repositoryValidationFileOrLink',
      link: 'generalValidation.repositoryValidationFileOrLink',
    }
  }

  if (fileUuid && link) {
    return {
      file: 'generalValidation.repositoryValidationEitherFileOrLink',
      link: 'generalValidation.repositoryValidationEitherFileOrLink',
    }
  }

  return undefined
}
export const RepositoryItems = {
  validate,
}
