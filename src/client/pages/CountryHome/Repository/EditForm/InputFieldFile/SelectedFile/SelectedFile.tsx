import './SelectedFile.scss'
import React from 'react'

import { RepositoryItem } from 'meta/cycleData'

import { useRepositoryItem } from 'client/store/ui/repository'
import ButtonDelete from 'client/components/Buttons/ButtonDelete'
import { DataCell, DataGrid } from 'client/components/DataGrid'
import { useOnRemoveFile } from 'client/pages/CountryHome/Repository/EditForm/InputFieldFile/hooks/useOnRemoveFile'
import RepositoryLink from 'client/pages/CountryHome/Repository/RepositoryLink'

const SelectedFile: React.FC = () => {
  const onRemoveFile = useOnRemoveFile()
  const repositoryItem = useRepositoryItem()

  if (!repositoryItem) {
    return null
  }

  return (
    <DataGrid>
      <DataCell className="repository-form__selected-file" editable lastCol lastRow>
        <RepositoryLink datum={repositoryItem as RepositoryItem} />
        <ButtonDelete onClick={onRemoveFile} />
      </DataCell>
    </DataGrid>
  )
}

export default SelectedFile
