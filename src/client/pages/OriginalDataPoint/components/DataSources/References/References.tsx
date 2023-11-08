import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import type { Jodit } from 'jodit/types/jodit'
import { Objects } from 'utils/objects'

import { ApiEndPoint } from 'meta/api/endpoint'
import { AreaCode } from 'meta/area'
import { AssessmentFile, AssessmentName, CycleName, OriginalDataPoint } from 'meta/assessment'
import { Topics } from 'meta/messageCenter'

import { useAssessmentFiles, useGetAssessmentFiles } from 'client/store/ui/assessmentFiles/hooks'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import ButtonCheckBox from 'client/components/ButtonCheckBox'
import EditorWYSIWYG from 'client/components/EditorWYSIWYG'
import MarkdownPreview from 'client/components/MarkdownPreview'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'client/components/Modal'
import ReviewIndicator from 'client/components/ReviewIndicator'

type ButtonType = Jodit['options']['buttons'][0]

type ReferencesProps = {
  originalDataPoint: OriginalDataPoint
  updateOriginalDataPoint: (originalDataPoint: OriginalDataPoint) => void
  disabled: boolean
  reviewIndicator: boolean
}

// TODO: Move to meta/assessment(cycle?)/files
// TODO: Cleanup
const getLink = (url: string, text: string) => <a href={`"${url}"`}>{text}</a>
const getLinkText = (url: string, text: string) => `<a href="${url}">${text}</a>`
const getAssessmentFileLink = (
  assessmentFile: AssessmentFile,
  assessmentName: AssessmentName,
  cycleName: CycleName,
  countryIso: AreaCode,
  asText = false
) => {
  const text = assessmentFile.fileName
  const url = `${ApiEndPoint.File.Assessment.one(
    assessmentFile.uuid
  )}?assessmentName=${assessmentName}&cycleName=${cycleName}&countryIso=${countryIso}`

  if (asText) return getLinkText(url, text)
  return getLink(url, text)
}

type AddFromRepositoryProps = { isOpen: boolean; onClose: (x: string) => void }

// TODO: Move to AddFromRepository/AddFromRepository.tsx
const AddFromRepository: React.FC<AddFromRepositoryProps> = (props: AddFromRepositoryProps) => {
  const { isOpen, onClose } = props
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams()
  const [selectedFiles, setSelectedFiles] = useState([])

  useGetAssessmentFiles()
  const assessmentFiles = useAssessmentFiles()

  if (assessmentFiles.length) return null

  const countryFiles = assessmentFiles[countryIso] || []

  const allSelected = selectedFiles.length === countryFiles.length
  const isChecked = (uuid: string) => selectedFiles.some((selectedFile) => selectedFile.uuid === uuid)

  const onClick = (uuid: string) => {
    if (isChecked(uuid)) setSelectedFiles(selectedFiles.filter((selectedFile) => selectedFile.uuid !== uuid))
    else setSelectedFiles([...selectedFiles, countryFiles.find((file) => file.uuid === uuid)])
  }

  const onClickAll = () => {
    if (selectedFiles.length === countryFiles.length) setSelectedFiles([])
    else setSelectedFiles(countryFiles)
  }

  return (
    <Modal isOpen={isOpen}>
      <ModalHeader>
        {/*
        TODO: Change or translate
        */}
        <h1>Select files</h1>
      </ModalHeader>
      <ModalBody>
        {/* TODO: label: Change or translate */}
        <ButtonCheckBox onClick={onClickAll} checked={allSelected} label="All" suffix="" />
        <div className="divider" />

        <div className="export__form-section-variables">
          {countryFiles.map((assessmentFile) => {
            return (
              <ButtonCheckBox
                key={assessmentFile.uuid}
                checked={isChecked(assessmentFile.uuid)}
                label={getAssessmentFileLink(assessmentFile, assessmentName, cycleName, countryIso)}
                onClick={() => onClick(assessmentFile.uuid)}
              />
            )
          })}
        </div>
      </ModalBody>
      <ModalFooter>
        <button
          type="button"
          className="btn btn--primary"
          onClick={() =>
            onClose(
              selectedFiles
                .map((file) => getAssessmentFileLink(file, assessmentName, cycleName, countryIso, true))
                .join(' ')
            )
          }
        >
          {/*
          TODO: Change or translate
          */}
          Close
        </button>
      </ModalFooter>
    </Modal>
  )
}

const References: React.FC<ReferencesProps> = (props) => {
  const { originalDataPoint, updateOriginalDataPoint, reviewIndicator, disabled } = props

  const { t } = useTranslation()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCustomButtonClick = () => {
    // Open the custom modal
    setIsModalOpen(true)
  }

  const closeModal = (x: string) => {
    // Close the custom modal
    setIsModalOpen(false)

    // TODO: This should go where cursor is
    const dataSourceReferences = Objects.isEmpty(x) ? null : `${originalDataPoint.dataSourceReferences}\n${x}`
    const originalDataPointUpdate = { ...originalDataPoint, dataSourceReferences }
    updateOriginalDataPoint(originalDataPointUpdate)
  }

  const customButton: ButtonType = useMemo(() => {
    return {
      name: t('landing.links.repository'),
      exec: handleCustomButtonClick,
      /* TODO: label: Change or translate */
      tooltip: 'Add links to the repository',
    }
  }, [t])

  const editorOptions = useMemo(() => ({ buttons: ['link', '|', customButton], statusbar: false }), [customButton])

  return (
    <tr>
      <th className="fra-table__header-cell-left">{t('nationalDataPoint.references')}</th>
      <td className="fra-table__cell-left odp__data-source-input-column">
        {disabled && (
          <div className="vgtf__textarea">
            <MarkdownPreview value={originalDataPoint.dataSourceReferences ?? ''} />
          </div>
        )}

        {!disabled && (
          <>
            <EditorWYSIWYG
              onChange={(value) => {
                const dataSourceReferences = Objects.isEmpty(value) ? null : value
                const originalDataPointUpdate = { ...originalDataPoint, dataSourceReferences }
                updateOriginalDataPoint(originalDataPointUpdate)
              }}
              options={editorOptions}
              value={originalDataPoint.dataSourceReferences ?? ''}
            />
            <AddFromRepository isOpen={isModalOpen} onClose={closeModal} />
          </>
        )}
      </td>
      {reviewIndicator && (
        <td className="fra-table__review-cell no-print">
          <ReviewIndicator
            title={t('nationalDataPoint.references')}
            subtitle={t('nationalDataPoint.dataSources')}
            topicKey={Topics.getOdpReviewTopicKey(originalDataPoint.id, 'dataSourceReferences')}
          />
        </td>
      )}
    </tr>
  )
}

export default References
