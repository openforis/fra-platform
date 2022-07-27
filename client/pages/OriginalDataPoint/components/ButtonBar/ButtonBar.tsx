/* eslint-disable no-alert */
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import { AssessmentName } from '@meta/assessment'

import { useAppDispatch } from '@client/store'
import { useAssessment, useCycle } from '@client/store/assessment'
import {
  OriginalDataPointActions,
  useIsOriginalDataPointUpdating,
  useOriginalDataPoint,
} from '@client/store/pages/originalDataPoint'
import { useCountryIso } from '@client/hooks'
import { ClientRoutes } from '@client/clientRoutes'

type Props = {
  canEditData: boolean
}

const ButtonBar: React.FC<Props> = (props) => {
  const { canEditData } = props
  const originalDataPoint = useOriginalDataPoint()

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { assessmentName, cycleName, section } = useParams<{
    assessmentName: AssessmentName
    cycleName: string
    section: string
  }>()
  const { i18n } = useTranslation()
  const countryIso = useCountryIso()
  const disabled = !originalDataPoint.id || useIsOriginalDataPointUpdating()
  const assessment = useAssessment()
  const cycle = useCycle()
  const assessmentSectionLink = ClientRoutes.Assessment.Section.getLink({
    countryIso,
    assessmentName,
    cycleName,
    section,
  })

  if (!canEditData) {
    return null
  }

  const handleDelete = () => {
    if (window.confirm(i18n.t('nationalDataPoint.confirmDelete'))) {
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
        {i18n.t('nationalDataPoint.doneEditing')}
      </button>

      <div className="odp-v-divider" />

      <button type="button" className="btn btn-destructive" disabled={disabled} onClick={handleDelete}>
        {i18n.t('nationalDataPoint.delete')}
      </button>
    </>
  )
}

export default ButtonBar
