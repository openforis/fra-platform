import './EditForm.scss'
import React from 'react'

import { Objects } from 'utils/objects'

import { useRepositoryItem } from 'client/store/ui/repository'
import { DataGrid } from 'client/components/DataGrid'
import SlidingPanel from 'client/components/SlidingPanel'
import Actions from 'client/pages/CountryHome/Repository/EditForm/Actions'
import InputField from 'client/pages/CountryHome/Repository/EditForm/InputField'
import InputFieldCheckbox from 'client/pages/CountryHome/Repository/EditForm/InputFieldCheckbox'
import InputFieldFile from 'client/pages/CountryHome/Repository/EditForm/InputFieldFile'
import Separator from 'client/pages/CountryHome/Repository/EditForm/Separator'

import { useClosePanel } from '../hooks/useClosePanel'
import { useOnChange } from './hooks/useOnChange'

const EditForm: React.FC = () => {
  const repositoryItem = useRepositoryItem()
  const { onChangeField, onChangeProps } = useOnChange()
  const closePanel = useClosePanel()

  const opened = !Objects.isEmpty(repositoryItem)

  return (
    <SlidingPanel closePanel={closePanel} opened={opened} size={45}>
      <DataGrid className="repository-form__container" gridTemplateColumns="60px 1fr">
        <InputField value={repositoryItem?.name} onChange={onChangeField} label="editUser.name" name="name" />
        <InputFieldCheckbox name="public" value={repositoryItem?.props?.public} onChange={onChangeProps} />

        <InputField value={repositoryItem?.link} onChange={onChangeField} label="common.link" name="link" />
        <Separator />
        <InputFieldFile />
        <Actions />
      </DataGrid>
    </SlidingPanel>
  )
}

export default EditForm
