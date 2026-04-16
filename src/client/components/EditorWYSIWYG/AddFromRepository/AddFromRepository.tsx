import './AddFromRepository.scss'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import Button, { ButtonSize } from 'client/components/Buttons/Button'
import { useRepositoryLinkContext } from 'client/components/EditorWYSIWYG/repositoryLinkContext'
import FileUpload from 'client/components/FileUpload'
import { Modal, ModalBody, ModalClose, ModalFooter, ModalHeader } from 'client/components/Modal'
import RepositoryList from 'client/components/RepositoryList'

import { useHandleSelect } from './hooks/useHandleSelect'
import { useOnClose } from './hooks/useOnClose'
import { useOnSuccess } from './hooks/useOnSuccess'

const AddFromRepository: React.FC = () => {
  const { t } = useTranslation()
  const { repositoryOpened, setSelectedFiles } = useRepositoryLinkContext()

  const { onSelect, onSelectFolder, selectedUuids } = useHandleSelect()
  const onClose = useOnClose()
  const onSuccess = useOnSuccess()

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
        <RepositoryList onSelect={onSelect} onSelectFolder={onSelectFolder} selectedUuids={selectedUuids} />
        <FileUpload multiple onChange={onSuccess} />
      </ModalBody>

      <ModalFooter>
        <Button iconName="checkbox" label={t('common.apply')} onClick={onClose} size={ButtonSize.m} />
      </ModalFooter>
    </Modal>
  )
}

export default AddFromRepository
