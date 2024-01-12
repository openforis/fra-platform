import './Panel.scss'
import React from 'react'

import SlidingPanel from 'client/components/SlidingPanel'
import Actions from 'client/pages/CountryHome/FraHome/Links/CreateFile/Panel/Actions'
import ClosePanel from 'client/pages/CountryHome/FraHome/Links/CreateFile/Panel/ClosePanel'
import InputField from 'client/pages/CountryHome/FraHome/Links/CreateFile/Panel/InputField'
import Separator from 'client/pages/CountryHome/FraHome/Links/CreateFile/Panel/Separator'

interface Props {
  openPanel: boolean
  setOpenPanel: (open: boolean) => void
}

const Panel: React.FC<Props> = (props: Props) => {
  const { openPanel, setOpenPanel } = props

  return (
    <SlidingPanel openPanel={openPanel} setOpenPanel={setOpenPanel}>
      <div className="create-file__container">
        <ClosePanel setOpenPanel={setOpenPanel} openPanel={openPanel} />
        <InputField label="editUser.name" name="name" type="text" />
        <InputField label="common.link" name="link" type="text" />
        <Separator />
        <InputField label="common.file" name="file" type="file" />
        <Actions setOpenPanel={setOpenPanel} />
      </div>
    </SlidingPanel>
  )
}

export default Panel
