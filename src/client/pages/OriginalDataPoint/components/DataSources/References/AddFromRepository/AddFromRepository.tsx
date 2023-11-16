import './AddFromRepository.scss'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { AssessmentFiles } from 'meta/cycleData'

import { useAssessmentCountryFiles, useGetAssessmentFiles } from 'client/store/ui/assessmentFiles'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import ButtonCheckBox from 'client/components/ButtonCheckBox'
import FileDrop from 'client/components/FileDrop'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'client/components/Modal'

import { useSelectedFileContext } from './context/selectedFilesContext'
import { useAllSelected } from './hooks/useAllSelected'
import { useIsChecked } from './hooks/useIsChecked'
import { useOnClick } from './hooks/useOnClick'
import { useOnClickAll } from './hooks/useOnClickAll'
import { useOnDrop } from './hooks/useOnDrop'
import { Props } from './Props'

const AddFromRepository: React.FC<Props> = (props: Props) => {
  const { isOpen, onClose } = props
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams()
  const { t } = useTranslation()
  const { setSelectedFiles } = useSelectedFileContext()

  useGetAssessmentFiles()
  const countryFiles = useAssessmentCountryFiles()

  const isChecked = useIsChecked()
  const allSelected = useAllSelected()

  const onClickAll = useOnClickAll()
  const onClick = useOnClick()

  const onDrop = useOnDrop()

  useEffect(() => {
    if (isOpen) setSelectedFiles([])
  }, [isOpen, setSelectedFiles])

  if (!isOpen) {
    return null
  }

  return (
    <Modal isOpen={isOpen}>
      <ModalHeader>
        <h3 className="subhead">{t('common.selectFiles')}</h3>
      </ModalHeader>

      <ModalBody>
        <div className="references-file-list">
          <div>
            <ButtonCheckBox onClick={onClickAll} checked={allSelected} label={t('contactPersons.all')} />
            <div className="divider" />

            {countryFiles.map((assessmentFile) => {
              const { uuid } = assessmentFile
              const url = AssessmentFiles.getHref({ assessmentName, cycleName, countryIso, uuid })
              const label = <a href={url}>{assessmentFile.fileName}</a>
              return (
                <ButtonCheckBox
                  key={assessmentFile.uuid}
                  checked={isChecked(assessmentFile.uuid)}
                  label={label}
                  onClick={() => onClick(assessmentFile.uuid)}
                />
              )
            })}
          </div>

          <FileDrop onDrop={onDrop} />
        </div>
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
