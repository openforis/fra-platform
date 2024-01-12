import './ClosePanel.scss'
import React from 'react'

import Icon from 'client/components/Icon'

type Props = {
  setOpenPanel: (open: boolean) => void
  openPanel: boolean
}

const ClosePanel: React.FC<Props> = (props: Props) => {
  const { setOpenPanel, openPanel } = props

  return (
    <button
      className="create-file__close-button btn-s btn btn-transparent"
      onClick={() => {
        setOpenPanel(!openPanel)
      }}
      type="button"
    >
      <Icon name="remove" />
    </button>
  )
}
export default ClosePanel
