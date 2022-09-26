import './collaboratorAccessModal.scss'
import React, { useEffect, useState } from 'react'

import { User } from '@meta/user'

import { Modal, ModalClose, ModalHeader } from '@client/components/Modal'

import CollaboratorAccessModalBody from './CollaboratorAccessModalBody'

type Props = {
  user: User
  headerLabel: string
  onChange?: (countryIso: string, filteredSelection: Array<string>) => void
  onClose: (selection: Array<string>) => void
  open: boolean
}

const CollaboratorAccessModal: React.FC<Props> = (props) => {
  const { headerLabel, onChange, onClose, open, user } = props

  const [selection, setSelection] = useState<Array<string>>([])

  const _onChange = (countryIso: string) => {
    const selectionUpdate = [...selection]
    if (selectionUpdate.includes(countryIso)) selectionUpdate.splice(selectionUpdate.indexOf(countryIso), 1)
    else selectionUpdate.push(countryIso)

    setSelection(selectionUpdate)
    onChange(countryIso, selectionUpdate)
  }

  const _onChangeAll = (countryISOs: Array<string>): void => {
    const selectionUpdate = [...countryISOs]
    setSelection(selectionUpdate)
    onChange('', selectionUpdate)
  }

  const _onChangeMany = (countryISOs: Array<string>, selectAll: boolean): void => {
    if (selectAll) {
      const selectionUpdate = [...countryISOs, ...selection]
      setSelection(selectionUpdate)
      onChange('', selectionUpdate)
    } else {
      const selectionUpdate: Array<string> = selection.filter((v) => !countryISOs.includes(v))
      setSelection(selectionUpdate)
      onChange('', selectionUpdate)
    }
  }

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

      <CollaboratorAccessModalBody
        user={user}
        onChange={_onChange}
        onChangeAll={_onChangeAll}
        onChangeMany={_onChangeMany}
        selection={selection}
      />
    </Modal>
  )
}

CollaboratorAccessModal.defaultProps = {
  onChange: () => ({}),
}

export default CollaboratorAccessModal
