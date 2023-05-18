import React from 'react'
import { useTranslation } from 'react-i18next'

import { useAppDispatch } from '@client/store'
import { AssessmentActions, useAssessment, useAssessmentCountry, useCycle } from '@client/store/assessment'
import { useHasOriginalDataPointData } from '@client/store/data'
import { useUser } from '@client/store/user'
import { useCountryIso } from '@client/hooks'

import { Props } from '../props'

const ForestCharacteristics: React.FC<Props> = (props) => {
  const { disabled } = props

  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const user = useUser()
  const countryIso = useCountryIso()
  const country = useAssessmentCountry()
  const assessment = useAssessment()
  const cycle = useCycle()
  const hasOriginalDataPointData = useHasOriginalDataPointData()
  const useOriginalDataPoint = country?.props?.forestCharacteristics?.useOriginalDataPoint

  if (!user || !hasOriginalDataPointData || !country) {
    return null
  }

  return (
    <>
      <button
        type="button"
        className={`btn btn-${useOriginalDataPoint ? 'secondary' : 'primary'} no-print`}
        onClick={() =>
          dispatch(
            AssessmentActions.updateCountryProp({
              assessmentName: assessment.props.name,
              countryIso,
              cycleName: cycle.name,
              sectionName: 'forestCharacteristics',
              countryProp: {
                forestCharacteristics: {
                  useOriginalDataPoint: !country.props.forestCharacteristics.useOriginalDataPoint,
                },
              },
            })
          )
        }
        disabled={disabled}
      >
        {useOriginalDataPoint
          ? t('forestCharacteristics.dontUseOriginalDataPoints')
          : t('forestCharacteristics.useOriginalDataPoints')}
      </button>

      <hr className="no-print" />
    </>
  )
}

export default ForestCharacteristics
