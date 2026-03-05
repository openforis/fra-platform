import './AddFromRepository.scss'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import Button, { ButtonSize } from 'client/components/Buttons/Button'
import { useRepositoryLinkContext } from 'client/components/EditorWYSIWYG/repositoryLinkContext'
import FileUpload from 'client/components/FileUpload'
import { Modal, ModalBody, ModalClose, ModalFooter, ModalHeader } from 'client/components/Modal'
import Resizable from 'client/components/Resizable'

import { useGetRepositoryItems } from './hooks/useGetRepositoryItems'
import { useGroupedItems } from './hooks/useGroupedItems'
import { useIsChecked } from './hooks/useIsChecked'
import { useOnClick } from './hooks/useOnClick'
import { useOnClose } from './hooks/useOnClose'
import { useOnSuccess } from './hooks/useOnSuccess'
import { useRepositoryItems } from './hooks/useRepositoryItems'
import ItemsGroup from './ItemsGroup'

const AddFromRepository: React.FC = () => {
  const { t } = useTranslation()
  const { repositoryOpened, setSelectedFiles } = useRepositoryLinkContext()

  const getRepositoryItems = useGetRepositoryItems()
  const isChecked = useIsChecked()
  const onClick = useOnClick()
  const onClose = useOnClose()
  const onSuccess = useOnSuccess()
  const repositoryItems = useRepositoryItems()
  const groupedItems = useGroupedItems(repositoryItems)

  useEffect(() => {
    if (repositoryOpened) {
      setSelectedFiles([])
      getRepositoryItems()
    }
  }, [getRepositoryItems, repositoryOpened, setSelectedFiles])

  if (!repositoryOpened) {
    return null
  }

  return (
    <Modal className="repository-modal" isOpen={repositoryOpened}>
      <Resizable defaultSize={{ width: 500, height: 'auto' }} maxWidth={1500} minWidth={500} vertical={false}>
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
          <div className="references-file-list">
            {groupedItems.map(([cycleUuid, items]) => (
              <ItemsGroup key={cycleUuid} cycleUuid={cycleUuid} isChecked={isChecked} items={items} onClick={onClick} />
            ))}

            <FileUpload multiple onChange={onSuccess} />
          </div>
        </ModalBody>

        <ModalFooter>
          <Button iconName="checkbox" label={t('common.apply')} onClick={onClose} size={ButtonSize.m} />
        </ModalFooter>
      </Resizable>
    </Modal>
  )
}

export default AddFromRepository
