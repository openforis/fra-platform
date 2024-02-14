import './Panel.scss'
import React from 'react'

import { Objects } from 'utils/objects'

import { useRepositoryItem } from 'client/store/ui/repository'
import SlidingPanel from 'client/components/SlidingPanel'
import Errors from 'client/pages/CountryHome/Repository/Errors'
import Actions from 'client/pages/CountryHome/Repository/Panel/Actions'
import InputField from 'client/pages/CountryHome/Repository/Panel/InputField'
import InputFieldCheckbox from 'client/pages/CountryHome/Repository/Panel/InputFieldCheckbox'
import InputFieldFile from 'client/pages/CountryHome/Repository/Panel/InputFieldFile'
import Separator from 'client/pages/CountryHome/Repository/Panel/Separator'

import { useClosePanel } from '../hooks/useClosePanel'
import { useOnChange } from './hooks/useOnChange'

const Panel: React.FC = () => {
  const repositoryItem = useRepositoryItem()
  const openPanel = !Objects.isEmpty(repositoryItem)

  const { onChangeField, onChangeProps } = useOnChange()
  const closePanel = useClosePanel()

  return (
    <SlidingPanel openPanel={openPanel} closePanel={closePanel}>
      <div className="repository-form__container">
        <InputField value={repositoryItem?.name} onChange={onChangeField} label="editUser.name" name="name" />
        <InputField value={repositoryItem?.link} onChange={onChangeField} label="common.link" name="link" />
        <Separator />
        <InputFieldFile />
        <InputFieldCheckbox name="public" value={repositoryItem?.props?.public} onChange={onChangeProps} />
        <Errors />
        <Actions />
      </div>
    </SlidingPanel>
  )
}

export default Panel
