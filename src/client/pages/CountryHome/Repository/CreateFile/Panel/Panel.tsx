import './Panel.scss'
import React from 'react'

import SlidingPanel from 'client/components/SlidingPanel'
import { useOnChange } from 'client/pages/CountryHome/Repository/CreateFile/Panel/hooks/useOnChange'
import { useOnSaveFile } from 'client/pages/CountryHome/Repository/CreateFile/Panel/hooks/useOnSaveFile'

import Actions from './Actions'
import InputField from './InputField'
import Separator from './Separator'

interface Props {
  openPanel: boolean
  setOpenPanel: (open: boolean) => void
}

const Panel: React.FC<Props> = (props: Props) => {
  const { openPanel, setOpenPanel } = props

  const { file, onChange } = useOnChange()
  const onSaveFile = useOnSaveFile(file)

  return (
    <SlidingPanel openPanel={openPanel} setOpenPanel={setOpenPanel}>
      <div className="repository-form__container">
        <InputField onChange={onChange} label="editUser.name" name="name" type="text" />
        <InputField onChange={onChange} label="common.link" name="link" type="text" />
        <Separator />
        <InputField onChange={onChange} label="common.file" name="file" type="file" />
        <Actions onSave={onSaveFile} setOpenPanel={setOpenPanel} />
      </div>
    </SlidingPanel>
  )
}

export default Panel
