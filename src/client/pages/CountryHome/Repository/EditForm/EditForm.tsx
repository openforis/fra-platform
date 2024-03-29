import './EditForm.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'

import { useIsFileInUse, useRepositoryItem } from 'client/store/ui/repository'
import { DataGrid } from 'client/components/DataGrid'
import Hr from 'client/components/Hr'
import SlidingPanel from 'client/components/SlidingPanel'
import Actions from 'client/pages/CountryHome/Repository/EditForm/Actions'
import FileUsages from 'client/pages/CountryHome/Repository/EditForm/FileUsages'
import InputField from 'client/pages/CountryHome/Repository/EditForm/InputField'
import InputFieldCheckbox from 'client/pages/CountryHome/Repository/EditForm/InputFieldCheckbox'
import InputFieldFile from 'client/pages/CountryHome/Repository/EditForm/InputFieldFile'

import { useClosePanel } from '../hooks/useClosePanel'
import { useGetRepositoryFileMeta } from './hooks/useGetRepositoryFileMeta'
import { useOnChange } from './hooks/useOnChange'

const EditForm: React.FC = () => {
  const { t } = useTranslation()
  const repositoryItem = useRepositoryItem()
  const { onChangeField, onChangeProps, onChangeTranslation } = useOnChange()
  const closePanel = useClosePanel()
  const isFileInUse = useIsFileInUse()

  useGetRepositoryFileMeta()

  const opened = !Objects.isEmpty(repositoryItem)

  return (
    <SlidingPanel closePanel={closePanel} opened={opened} size={45}>
      <DataGrid className="repository-form" gridTemplateColumns="60px 1fr">
        <InputField
          disabled={isFileInUse}
          label="common.label"
          name="en"
          onChange={onChangeTranslation}
          value={repositoryItem?.props.translation.en}
        />
        <Hr />
        <InputField label="common.link" name="link" onChange={onChangeField} value={repositoryItem?.link} />
        <div className="repository-form__label">{t('common:or')}</div>
        <div />
        <InputFieldFile />
        <Hr />
        <InputFieldCheckbox name="public" onChange={onChangeProps} value={repositoryItem?.props?.public} />
        <Hr />
        <Actions />
        <FileUsages />
      </DataGrid>
    </SlidingPanel>
  )
}

export default EditForm
