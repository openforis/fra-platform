import { RepositoryItem } from 'meta/cycleData/repository/repository'

export type RepositoryItemValidation = {
  name?: string
  fileUuid?: string
  link?: string
}

const validate = (repositoryItem: Partial<RepositoryItem>): RepositoryItemValidation | undefined => {
  const {
    fileUuid,
    link,
    props: {
      translation: { en: name },
    },
  } = repositoryItem || {}

  if (!name) {
    return { name: 'validation.repositoryItem.nameIsRequired' }
  }

  if (!fileUuid && !link) {
    return {
      fileUuid: 'validation.repositoryItem.fileOrLink',
      link: 'validation.repositoryItem.fileOrLink',
    }
  }

  if (fileUuid && link) {
    return {
      fileUuid: 'validation.repositoryItem.eitherFileOrLink',
      link: 'validation.repositoryItem.eitherFileOrLink',
    }
  }

  return undefined
}
export const RepositoryItemValidator = {
  validate,
}
