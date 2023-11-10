import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { ApiEndPoint } from 'meta/api/endpoint'
import { AreaCode } from 'meta/area'
import { AssessmentFile, AssessmentName, CycleName } from 'meta/assessment'
import { Routes } from 'meta/routes'

import { useAssessmentFiles, useGetAssessmentFiles, useUpdateAssessmentFiles } from 'client/store/ui/assessmentFiles'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import ButtonCheckBox from 'client/components/ButtonCheckBox'
import Dropzone from 'client/components/Dropzone'
import Icon from 'client/components/Icon'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'client/components/Modal'

// TODO: Move to meta/assessment(cycle?)/files

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

const AddFromRepository: React.FC<AddFromRepositoryProps> = (props: AddFromRepositoryProps) => {
  const { t } = useTranslation()
  const { isOpen, onClose } = props
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams()
  const [selectedFiles, setSelectedFiles] = useState([])

  useGetAssessmentFiles()

  const assessmentFiles = useAssessmentFiles()
  const uploadAssessmentFile = useUpdateAssessmentFiles()

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

  const onDrop = (files: Array<File>) => {
    setSelectedFiles([...selectedFiles, ...files])

    files.forEach((file) => {
      uploadAssessmentFile({
        fileCountryIso: countryIso,
        file,
      })
    })
  }

  return (
    <Modal isOpen={isOpen}>
      <ModalHeader>
        <div>
          {/*
        TODO: Change or translate
        */}
          <h1>Select files</h1>
        </div>
        <div>
          <Link
            target="_blank"
            to={Routes.CountryHomeSection.generatePath({
              assessmentName,
              cycleName,
              countryIso,
              sectionName: 'links',
            })}
          >
            {t(`landing.sections.links`)}
            <Icon name="external-link" />
          </Link>
        </div>
      </ModalHeader>
      <ModalBody>
        <div
          style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gridGap: '10px', padding: '10px' }}
          className="references-file-list"
        >
          <div>
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
          </div>

          <div>
            <Dropzone onDrop={onDrop} />
          </div>
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

export default AddFromRepository
