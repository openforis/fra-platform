import './AddFromRepository.scss'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { RepositoryItems } from 'meta/cycleData/repository/items'
import { Translations } from 'meta/translation/translations'

import { useLanguage } from 'client/hooks/language'
import { useCountryRouteParams } from 'client/hooks/routeParams'
import Button, { ButtonSize } from 'client/components/Buttons/Button'
import ButtonCheckBox, { ButtonCheckboxVariant } from 'client/components/Buttons/ButtonCheckbox'
import { useRepositoryLinkContext } from 'client/components/EditorWYSIWYG/repositoryLinkContext'
import FileUpload from 'client/components/FileUpload'
import Icon from 'client/components/Icon'
import { Modal, ModalBody, ModalClose, ModalFooter, ModalHeader } from 'client/components/Modal'

import { useGetRepositoryItems } from './hooks/useGetRepositoryItems'
import { useIsChecked } from './hooks/useIsChecked'
import { useOnClick } from './hooks/useOnClick'
import { useOnClose } from './hooks/useOnClose'
import { useOnSuccess } from './hooks/useOnSuccess'
import { useRepositoryItems } from './hooks/useRepositoryItems'

const AddFromRepository: React.FC = () => {
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams()
  const { t } = useTranslation()
  const language = useLanguage()
  const { repositoryOpened, setSelectedFiles } = useRepositoryLinkContext()

  const getRepositoryItems = useGetRepositoryItems()
  const isChecked = useIsChecked()
  const onClick = useOnClick()
  const onClose = useOnClose()
  const onSuccess = useOnSuccess()
  const repositoryItems = useRepositoryItems()

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
      <ModalHeader>
        <div>
          <h3 className="subhead">{t('common.selectFiles')}</h3>
          <span>{t('nationalDataPoint.fileAddedWillBecomePublic')}</span>
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
          {repositoryItems?.map((repositoryItem) => {
            const url = RepositoryItems.getURL({ assessmentName, cycleName, countryIso, repositoryItem })
            const label = Translations.getLabel({ translation: repositoryItem.props.translation, language })

            return (
              <div key={repositoryItem.uuid} className="file-row">
                <ButtonCheckBox
                  checked={isChecked(repositoryItem.uuid)}
                  label={label}
                  onClick={(): void => onClick(repositoryItem.uuid)}
                  variant={ButtonCheckboxVariant.checkbox}
                />
                <a href={url}>
                  <Icon name="hit-down" />
                </a>
              </div>
            )
          })}

          <FileUpload multiple onChange={onSuccess} />
        </div>
      </ModalBody>

      <ModalFooter>
        <Button iconName="checkbox" label={t('common.apply')} onClick={onClose} size={ButtonSize.m} />
      </ModalFooter>
    </Modal>
  )
}

export default AddFromRepository
