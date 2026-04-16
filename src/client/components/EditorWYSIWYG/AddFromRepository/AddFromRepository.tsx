import './AddFromRepository.scss'
import React, { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { RepositoryItem, RepositoryItemTree } from 'meta/cycleData/repository/item'

import Button, { ButtonSize } from 'client/components/Buttons/Button'
import { useRepositoryLinkContext } from 'client/components/EditorWYSIWYG/repositoryLinkContext'
import FileUpload from 'client/components/FileUpload'
import { Modal, ModalBody, ModalClose, ModalFooter, ModalHeader } from 'client/components/Modal'
import RepositoryList from 'client/components/RepositoryList'

import { useOnClose } from './hooks/useOnClose'
import { useOnSuccess } from './hooks/useOnSuccess'

const AddFromRepository: React.FC = () => {
  const { t } = useTranslation()
  const { repositoryOpened, selectedFiles, setSelectedFiles } = useRepositoryLinkContext()

  const onClose = useOnClose()
  const onSuccess = useOnSuccess()

  useEffect(() => {
    if (repositoryOpened) setSelectedFiles([])
  }, [repositoryOpened, setSelectedFiles])

  const handleSelect = useCallback(
    (item: RepositoryItemTree) => {
      setSelectedFiles((prev: Array<RepositoryItem>) =>
        prev.some((f) => f.uuid === item.uuid) ? prev.filter((f) => f.uuid !== item.uuid) : [...prev, item]
      )
    },
    [setSelectedFiles]
  )

  const handleSelectFolder = useCallback(
    (items: Array<RepositoryItemTree>, select: boolean) => {
      setSelectedFiles((prev: Array<RepositoryItem>) => {
        if (select) {
          const newItems = items.filter((item) => !prev.some((f) => f.uuid === item.uuid))
          return [...prev, ...newItems]
        }
        const uuids = new Set(items.map((item) => item.uuid))
        return prev.filter((f) => !uuids.has(f.uuid))
      })
    },
    [setSelectedFiles]
  )

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
        <RepositoryList
          onSelect={handleSelect}
          onSelectFolder={handleSelectFolder}
          selectable
          selectedUuids={selectedFiles.map((f: RepositoryItem) => f.uuid)}
        />
        <FileUpload multiple onChange={onSuccess} />
      </ModalBody>

      <ModalFooter>
        <Button iconName="checkbox" label={t('common.apply')} onClick={onClose} size={ButtonSize.m} />
      </ModalFooter>
    </Modal>
  )
}

export default AddFromRepository
