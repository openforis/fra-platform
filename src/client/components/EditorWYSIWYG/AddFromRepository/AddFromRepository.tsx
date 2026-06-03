import './AddFromRepository.scss'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import Button, { ButtonSize } from 'client/components/Buttons/Button'
import { useRepositoryLinkContext } from 'client/components/EditorWYSIWYG/repositoryLinkContext'
import { Modal, ModalBody, ModalClose, ModalFooter, ModalHeader } from 'client/components/Modal'
import RepositoryList from 'client/components/RepositoryList'

import { useHandleSelect } from './hooks/useHandleSelect'
import { useOnClose } from './hooks/useOnClose'

const AddFromRepository: React.FC = () => {
  const { t } = useTranslation()
  const { repositoryOpened, setSelectedFiles } = useRepositoryLinkContext()

  const { onSelect, selectedUuids } = useHandleSelect()
  const onClose = useOnClose()

  useEffect(() => {
    if (repositoryOpened) setSelectedFiles([])
  }, [repositoryOpened, setSelectedFiles])

  if (!repositoryOpened) {
    return null
  }

  return (
    <Modal className="repository-modal" isOpen={repositoryOpened}>
      <ModalHeader>
        <div>
          <h3 className="subhead">{t('common.selectFiles')}</h3>
        </div>
        <ModalClose
          onClose={(): void => {
            setSelectedFiles([])
            onClose()
          }}
        />
      </ModalHeader>

      <ModalBody>
        <RepositoryList onSelect={onSelect} selectedUuids={selectedUuids} />
      </ModalBody>

      <ModalFooter>
        <Button iconName="checkbox" label={t('common.apply')} onClick={onClose} size={ButtonSize.m} />
      </ModalFooter>
    </Modal>
  )
}

export default AddFromRepository
