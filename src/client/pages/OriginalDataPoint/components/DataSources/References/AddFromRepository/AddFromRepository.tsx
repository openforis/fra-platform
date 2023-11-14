import React from 'react'
import { useTranslation } from 'react-i18next'

import Icon from 'client/components/Icon'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'client/components/Modal'

type Props = {
  isOpen: boolean
  onClose: () => void
}

const AddFromRepository = (props: Props) => {
  const { isOpen, onClose } = props
  const { t } = useTranslation()

  if (!isOpen) {
    return null
  }

  return (
    <Modal isOpen={isOpen}>
      <ModalHeader>
        <h3 className="subhead">Select files</h3>
        <a className="btn btn-link" href="#/">
          {t('landing.sections.links')}
          <Icon className="icon-sub icon-margin-left btn-link" name="external-link" />
        </a>
      </ModalHeader>

      <ModalBody>
        <p>Modal body</p>
      </ModalBody>

      <ModalFooter>
        <button type="button" className="btn btn-transparent" onClick={onClose}>
          Close
        </button>
      </ModalFooter>
    </Modal>
  )
}
export default AddFromRepository
