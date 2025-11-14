import { RepositoryItem } from 'meta/cycleData/repository/item'
import { RepositoryItemValidation } from 'meta/cycleData/repository/itemValidation'

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
