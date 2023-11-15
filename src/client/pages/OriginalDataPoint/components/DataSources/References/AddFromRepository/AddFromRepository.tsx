import React from 'react'
import { useTranslation } from 'react-i18next'

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
        <h3 className="subhead">{t('common.selectFiles')}</h3>
      </ModalHeader>

      <ModalBody>
        <p>Modal body</p>
      </ModalBody>

      <ModalFooter>
        <button type="button" className="btn btn-transparent" onClick={onClose}>
          {t('common.close')}
        </button>
      </ModalFooter>
    </Modal>
  )
}
export default AddFromRepository
