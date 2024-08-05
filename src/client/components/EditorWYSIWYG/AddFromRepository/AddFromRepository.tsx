import './AddFromRepository.scss'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { RepositoryItems } from 'meta/cycleData'
import { Translations } from 'meta/translation'

import { useLanguage } from 'client/hooks/useLanguage'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import ButtonCheckBox from 'client/components/ButtonCheckBox'
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
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams()
  const { t } = useTranslation()
  const language = useLanguage()
  const { repositoryOpened, setSelectedFiles } = useRepositoryLinkContext()

  useGetRepositoryItems()
  const isChecked = useIsChecked()
  const onClick = useOnClick()
  const onClose = useOnClose()
  const onSuccess = useOnSuccess()
  const repositoryItems = useRepositoryItems()

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
          <span>{t('nationalDataPoint.fileAddedWillBecomePublic')}</span>
        </div>
        <ModalClose
          onClose={() => {
            setSelectedFiles([])
            onClose()
          }}
        />
      </ModalHeader>

      <ModalBody>
        <div className="references-file-list">
          <div>
            {/* <ButtonCheckBox onClick={onClickAll} checked={allSelected} label={t('contactPersons.all')} /> */}
            {/* <div className="divider" /> */}

            {repositoryItems?.map((repositoryItem) => {
              const url = RepositoryItems.getURL({ assessmentName, cycleName, countryIso, repositoryItem })
              const label = Translations.getLabel({ translation: repositoryItem.props.translation, language })

              return (
                <div key={repositoryItem.uuid} className="file-row">
                  <ButtonCheckBox
                    checked={isChecked(repositoryItem.uuid)}
                    label={label}
                    onClick={() => onClick(repositoryItem.uuid)}
                  />
                  <a href={url}>
                    <Icon className="icon-sub " name="hit-down" />
                  </a>
                </div>
              )
            })}
          </div>

          <FileUpload multiple onChange={onSuccess} />
        </div>
      </ModalBody>

      <ModalFooter>
        <button className="btn btn-primary" onClick={onClose} type="button">
          {t('common.apply')}
        </button>
      </ModalFooter>
    </Modal>
  )
}

export default AddFromRepository
