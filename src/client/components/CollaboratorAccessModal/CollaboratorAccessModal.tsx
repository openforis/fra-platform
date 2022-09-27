import './collaboratorAccessModal.scss'
import React, { useEffect, useState } from 'react'

import { User } from '@meta/user'

import { Modal, ModalClose, ModalHeader } from '@client/components/Modal'

import CollaboratorAccessModalBody from './CollaboratorAccessModalBody'

type Props = {
  user: User
  headerLabel: string
  onClose: (selection: Array<string>) => void
  open: boolean
}

const CollaboratorAccessModal: React.FC<Props> = (props) => {
  const { headerLabel, onClose, open, user } = props

  const [selection, setSelection] = useState<Array<string>>([])

  const _onClose = () => {
    onClose(selection)
    setSelection([])
  }

  useEffect(() => {
    if (open) document.body.classList.add('no-scroll')
    else document.body.classList.remove('no-scroll')
  }, [open])

  return (
    <Modal className="modal-country-select" isOpen={open}>
      <ModalHeader>
        {headerLabel}
        <ModalClose onClose={_onClose} />
      </ModalHeader>

      <CollaboratorAccessModalBody user={user} />
    </Modal>
  )
}

export default CollaboratorAccessModal
