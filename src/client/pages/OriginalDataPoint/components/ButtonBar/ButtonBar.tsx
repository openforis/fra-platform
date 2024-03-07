/* eslint-disable no-alert */
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import { AssessmentName } from 'meta/assessment'
import { Routes } from 'meta/routes'

import { useAppDispatch } from 'client/store'
import { useAssessment, useCycle } from 'client/store/assessment'
import {
  OriginalDataPointActions,
  useIsOriginalDataPointUpdating,
  useOriginalDataPoint,
} from 'client/store/ui/originalDataPoint'
import { useCountryIso } from 'client/hooks'

type Props = {
  canEditData: boolean
}

const ButtonBar: React.FC<Props> = (props) => {
  const { canEditData } = props
  const originalDataPoint = useOriginalDataPoint()

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { assessmentName, cycleName, sectionName } = useParams<{
    assessmentName: AssessmentName
    cycleName: string
    sectionName: string
  }>()
  const { t } = useTranslation()
  const countryIso = useCountryIso()
  const isOriginalDataPointUpdating = useIsOriginalDataPointUpdating()
  const disabled = !originalDataPoint.id || isOriginalDataPointUpdating
  const assessment = useAssessment()
  const cycle = useCycle()
  const assessmentSectionLink = Routes.Section.generatePath({
    countryIso,
    assessmentName,
    cycleName,
    sectionName,
  })

  if (!canEditData) {
    return null
  }

  const handleDelete = () => {
    if (window.confirm(t('nationalDataPoint.confirmDelete'))) {
      dispatch(
        OriginalDataPointActions.deleteOriginalDataPoint({
          countryIso,
          assessmentName: assessment.props.name,
          cycleName: cycle.name,
          originalDataPoint,
        })
      )
      navigate(assessmentSectionLink)
    }
  }

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        disabled={disabled}
        onClick={() => {
          navigate(assessmentSectionLink)
        }}
      >
        {t('nationalDataPoint.doneEditing')}
      </button>

      <div className="odp-v-divider" />

      <button type="button" className="btn btn-destructive" disabled={disabled} onClick={handleDelete}>
        {t('common.delete')}
      </button>
    </>
  )
}

export default ButtonBar
