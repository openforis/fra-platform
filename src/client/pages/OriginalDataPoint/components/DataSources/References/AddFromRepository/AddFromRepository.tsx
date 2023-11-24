import './AddFromRepository.scss'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { AssessmentFile, AssessmentFiles } from 'meta/cycleData'

import { useAssessmentCountryFiles, useGetAssessmentFiles } from 'client/store/ui/assessmentFiles'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import ButtonCheckBox from 'client/components/ButtonCheckBox'
import FileDrop from 'client/components/FileDrop'
import Icon from 'client/components/Icon'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'client/components/Modal'

import { useSelectedFileContext } from '../context/selectedFilesContext'
import { useIsChecked } from './hooks/useIsChecked'
import { useOnClick } from './hooks/useOnClick'
import { useOnDrop } from './hooks/useOnDrop'

type Props = {
  isOpen: boolean
  onClose: (selectedFiles: Array<AssessmentFile>) => void
}

const AddFromRepository: React.FC<Props> = (props: Props) => {
  const { isOpen, onClose } = props
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams()
  const { t } = useTranslation()
  const { selectedFiles, setSelectedFiles } = useSelectedFileContext()

  useGetAssessmentFiles()
  const countryFiles = useAssessmentCountryFiles()

  const isChecked = useIsChecked()
  // const allSelected = useAllSelected()

  // const onClickAll = useOnClickAll()
  const onClick = useOnClick()

  const onDrop = useOnDrop()

  useEffect(() => {
    if (isOpen) setSelectedFiles([])
  }, [isOpen, setSelectedFiles])

  if (!isOpen) {
    return null
  }

  return (
    <Modal className="repository-modal" isOpen={isOpen}>
      <ModalHeader>
        <div>
          <h3 className="subhead">{t('common.selectFiles')}</h3>
          <span>{t('nationalDataPoint.fileAddedWillBecomePublic')}</span>
        </div>
      </ModalHeader>

      <ModalBody>
        <div className="references-file-list">
          <div>
            {/* <ButtonCheckBox onClick={onClickAll} checked={allSelected} label={t('contactPersons.all')} /> */}
            {/* <div className="divider" /> */}

            {countryFiles.map((assessmentFile) => {
              const { uuid } = assessmentFile
              const url = AssessmentFiles.getHref({ assessmentName, cycleName, countryIso, uuid })
              const label = assessmentFile.fileName

              return (
                <div className="file-row">
                  <ButtonCheckBox
                    key={assessmentFile.uuid}
                    checked={isChecked(assessmentFile.uuid)}
                    label={label}
                    onClick={() => onClick(assessmentFile.uuid)}
                  />
                  <a href={url}>
                    <Icon name="hit-down" className="icon-sub " />
                  </a>
                </div>
              )
            })}
          </div>

          <FileDrop onDrop={onDrop} />
        </div>
      </ModalBody>

      <ModalFooter>
        <button type="button" className="btn btn-primary" onClick={() => onClose(selectedFiles)}>
          {t('common.apply')}
        </button>
      </ModalFooter>
    </Modal>
  )
}
export default AddFromRepository
