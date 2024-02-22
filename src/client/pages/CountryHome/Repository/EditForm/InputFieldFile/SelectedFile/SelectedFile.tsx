import './SelectedFile.scss'
import React from 'react'

import { RepositoryItem } from 'meta/cycleData'

import { useRepositoryFile, useRepositoryItem } from 'client/store/ui/repository'
import ButtonDelete from 'client/components/Buttons/ButtonDelete'
import { useOnRemoveFile } from 'client/pages/CountryHome/Repository/EditForm/InputFieldFile/hooks/useOnRemoveFile'
import RepositoryLink from 'client/pages/CountryHome/Repository/RepositoryLink'

const SelectedFile: React.FC = () => {
  const onRemoveFile = useOnRemoveFile()
  const repositoryItem = useRepositoryItem()
  const repositoryFile = useRepositoryFile()

  if (!repositoryItem) {
    return null
  }

  return (
    <div className="repository-form__selected-file">
      <RepositoryLink datum={repositoryItem as RepositoryItem} name={repositoryFile.name} />
      <ButtonDelete onClick={onRemoveFile} />
    </div>
  )
}

export default SelectedFile
