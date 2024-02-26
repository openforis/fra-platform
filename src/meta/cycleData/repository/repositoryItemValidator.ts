import { RepositoryItem } from 'meta/cycleData/repository/repository'

export type RepositoryItemValidation = {
  name?: string
  fileUuid?: string
  link?: string
}

const validate = (repositoryItem: Partial<RepositoryItem>): RepositoryItemValidation | undefined => {
  const {
    props: {
      translation: { en: name },
    },
    fileUuid,
    link,
  } = repositoryItem || {}

  if (!name) {
    return { name: 'validation.repositoryItem.repositoryValidationName' }
  }

  if (!fileUuid && !link) {
    return {
      fileUuid: 'validation.repositoryItem.repositoryValidationFileOrLink',
      link: 'validation.repositoryItem.repositoryValidationFileOrLink',
    }
  }

  if (fileUuid && link) {
    return {
      fileUuid: 'validation.repositoryItem.repositoryValidationEitherFileOrLink',
      link: 'validation.repositoryItem.repositoryValidationEitherFileOrLink',
    }
  }

  return undefined
}
export const RepositoryItemValidator = {
  validate,
}