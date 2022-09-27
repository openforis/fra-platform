import './collaboratorAccessModal.scss'
import React, { useEffect } from 'react'

import { User } from '@meta/user'

import { Modal, ModalClose, ModalHeader } from '@client/components/Modal'

import CollaboratorAccessModalBody from './CollaboratorAccessModalBody'

type Props = {
  user: User
  headerLabel: string
  onClose: () => void
  open: boolean
}

const CollaboratorAccessModal: React.FC<Props> = (props) => {
  const { headerLabel, onClose, open, user } = props

  useEffect(() => {
    if (open) document.body.classList.add('no-scroll')
    else document.body.classList.remove('no-scroll')
  }, [open])

  return (
    <Modal className="modal-collaborator-access" isOpen={open}>
      <ModalHeader>
        {headerLabel}
        <ModalClose onClose={onClose} />
      </ModalHeader>

      <CollaboratorAccessModalBody user={user} />
    </Modal>
  )
}

export default CollaboratorAccessModal
