import { RepositoryItem } from 'meta/cycleData/repository/item'
import { RepositoryItemValidation } from 'meta/cycleData/repository/itemValidation'

const validate = (repositoryItem: Partial<RepositoryItem>): RepositoryItemValidation | undefined => {
  const { fileUuid, folderName, link, props } = repositoryItem || {}
  const name = props?.translation?.en

  if (folderName !== undefined) {
    if (!folderName) return { folderName: 'validation.repositoryItem.nameIsRequired' }
    return undefined
  }

  if (!name) return { name: 'validation.repositoryItem.nameIsRequired' }

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
