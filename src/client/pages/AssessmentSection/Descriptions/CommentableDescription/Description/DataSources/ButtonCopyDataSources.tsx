import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { CommentableDescriptionValue } from 'meta/assessment'

import { useAppDispatch } from 'client/store'
import { useAssessment, useCycle } from 'client/store/assessment'
import { usePreviousSection } from 'client/store/assessment/hooks/usePreviousSection'
import { DataActions } from 'client/store/data'
import { useCountryIso } from 'client/hooks'

interface Props {
  disabled: boolean
  currentValue: CommentableDescriptionValue
  sectionName: string
}

export const ButtonCopyDataSources: React.FC<Props> = (props: Props) => {
  const { disabled, currentValue, sectionName } = props
  const dispatch = useAppDispatch()
  const assessment = useAssessment()
  const cycle = useCycle()
  const countryIso = useCountryIso()
  const { t } = useTranslation()
  const previousSection = usePreviousSection(sectionName)

  const onCopyClick = useCallback(() => {
    dispatch(
      DataActions.copyPreviousDatasources({
        countryIso,
        assessmentName: assessment.props.name,
        cycleName: cycle.name,
        currentValue,
        previousSectionName: previousSection?.props.name,
        sectionName,
      })
    )
  }, [assessment.props.name, countryIso, currentValue, cycle.name, dispatch, previousSection?.props.name, sectionName])

  const copyDisabled = disabled || !previousSection

  return (
    <button type="button" className="btn-s btn-primary btn-copy-prev-values" disabled={copyDisabled} onClick={onCopyClick}>
      {t('nationalDataPoint.copyPreviousValues')}
    </button>
  )
}

export default ButtonCopyDataSources
