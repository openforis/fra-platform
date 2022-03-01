/* eslint-disable no-alert */
import React from 'react'
import { useHistory, useParams } from 'react-router'
import { AssessmentName } from '@meta/assessment'
import { useAppDispatch } from '@client/store'
import { useCountryIso } from '@client/hooks'
import { useTranslation } from 'react-i18next'
import { BasePaths } from '@client/basePaths'
import {
  OriginalDataPointActions,
  useOriginalDataPoint,
  useIsOriginalDataPointUpdating,
} from '@client/store/pages/originalDataPoint'
import { useAssessment, useCycle } from '@client/store/assessment'

type Props = {
  canEditData: boolean
}

const ButtonBar: React.FC<Props> = (props) => {
  const { canEditData } = props
  const originalDataPoint = useOriginalDataPoint()

  const dispatch = useAppDispatch()
  const history = useHistory()
  const { assessmentName, cycleName, section } =
    useParams<{ assessmentName: AssessmentName; cycleName: string; section: string }>()
  const { i18n } = useTranslation()
  const countryIso = useCountryIso()
  const disabled = !originalDataPoint.id || useIsOriginalDataPointUpdating()
  const assessment = useAssessment()
  const cycle = useCycle()
  const assessmentSectionLink = BasePaths.Assessment.section(countryIso, assessmentName, cycleName, section)

  if (!canEditData) {
    return null
  }

  const handleDelete = () => {
    if (window.confirm(i18n.t('nationalDataPoint.confirmDelete'))) {
      dispatch(
        OriginalDataPointActions.deleteOriginalDataPoint({
          assessmentName: assessment.props.name,
          cycleName: cycle.name,
          originalDataPoint,
        })
      )
      history.push(assessmentSectionLink)
    }
  }

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        disabled={disabled}
        onClick={() => {
          history.push(assessmentSectionLink)
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
