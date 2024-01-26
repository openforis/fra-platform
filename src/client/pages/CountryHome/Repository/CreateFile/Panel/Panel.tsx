import './Panel.scss'
import React from 'react'

import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'

import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import SlidingPanel from 'client/components/SlidingPanel'

import Actions from './Actions'
import InputField from './InputField'
import Separator from './Separator'

interface Props {
  openPanel: boolean
  setOpenPanel: (open: boolean) => void
}

type NewFile = {
  name: string
  link: string
  file: File
}

const Panel: React.FC<Props> = (props: Props) => {
  const { openPanel, setOpenPanel } = props
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams()

  const [file, setFile] = React.useState<NewFile | null>(null)

  // Placeholder, move to separate hook
  const _onChange = (name: string, value: string | File) => {
    if (name === 'file') {
      setFile({ ...file, file: value as File })
    } else {
      setFile({ ...file, [name]: value })
    }
  }

  // Placeholder, move to separate hook
  const _onSave = async () => {
    const formData = new FormData()
    formData.append('name', file?.name || '')
    formData.append('link', file?.link || '')

    if (file?.file) {
      formData.append('file', file.file)
    }

    await axios.post(ApiEndPoint.CycleData.Repository.one(), formData, {
      params: {
        countryIso,
        assessmentName,
        cycleName,
      },
    })
    setOpenPanel(false)
  }

  return (
    <SlidingPanel openPanel={openPanel} setOpenPanel={setOpenPanel}>
      <div className="repository-form__container">
        <InputField onChange={_onChange} label="editUser.name" name="name" type="text" />
        <InputField onChange={_onChange} label="common.link" name="link" type="text" />
        <Separator />
        <InputField onChange={_onChange} label="common.file" name="file" type="file" />
        <Actions onSave={_onSave} setOpenPanel={setOpenPanel} />
      </div>
    </SlidingPanel>
  )
}

export default Panel
