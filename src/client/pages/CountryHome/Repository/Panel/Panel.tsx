import './Panel.scss'
import React from 'react'

import { Objects } from 'utils/objects'

import { useRepositoryItem } from 'client/store/ui/repository/hooks'
import SlidingPanel from 'client/components/SlidingPanel'
import Actions from 'client/pages/CountryHome/Repository/Panel/Actions'
import InputField from 'client/pages/CountryHome/Repository/Panel/InputField'
import InputFieldFile from 'client/pages/CountryHome/Repository/Panel/InputFieldFile'
import Separator from 'client/pages/CountryHome/Repository/Panel/Separator'

import { useClosePanel } from '../hooks/useClosePanel'
import { useOnChange } from './hooks/useOnChange'

const Panel: React.FC = () => {
  const repositoryItem = useRepositoryItem()
  const openPanel = !Objects.isEmpty(repositoryItem)

  const onChange = useOnChange()
  const closePanel = useClosePanel()

  return (
    <SlidingPanel openPanel={openPanel} setOpenPanel={closePanel}>
      <div className="repository-form__container">
        <InputField value={repositoryItem?.name} onChange={onChange} label="editUser.name" name="name" />
        <InputField value={repositoryItem?.link} onChange={onChange} label="common.link" name="link" />
        <Separator />
        <InputFieldFile />
        <Actions />
      </div>
    </SlidingPanel>
  )
}

export default Panel
