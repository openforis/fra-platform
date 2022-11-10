import React from 'react'
import { useTranslation } from 'react-i18next'

import { useAppDispatch } from '@client/store'
import { AssessmentActions, useAssessment, useAssessmentCountry, useCycle } from '@client/store/assessment'
import { useHasOriginalDataPointData } from '@client/store/pages/assessmentSection'
import { useUser } from '@client/store/user'
import { useCountryIso } from '@client/hooks'

import { Props } from '../props'

const ForestCharacteristics: React.FC<Props> = (props) => {
  const { disabled } = props

  const i18n = useTranslation()
  const dispatch = useAppDispatch()
  const user = useUser()
  const countryIso = useCountryIso()
  const country = useAssessmentCountry()
  const assessment = useAssessment()
  const cycle = useCycle()
  const hasOriginalDataPointData = useHasOriginalDataPointData()
  const useOriginalDataPoint = country?.props?.forestCharacteristics[cycle.uuid]?.useOriginalDataPoint

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
            AssessmentActions.updateCountry({
              countryIso,
              assessmentName: assessment.props.name,
              cycleName: cycle.name,
              country: {
                ...country,
                props: {
                  ...country.props,
                  forestCharacteristics: {
                    ...country.props.forestCharacteristics,
                    [cycle.uuid]: {
                      useOriginalDataPoint: !country.props.forestCharacteristics[cycle.uuid]?.useOriginalDataPoint,
                    },
                  },
                },
              },
            })
          )
        }
        disabled={disabled}
      >
        {useOriginalDataPoint
          ? i18n.t<string>('forestCharacteristics.dontUseOriginalDataPoints')
          : i18n.t<string>('forestCharacteristics.useOriginalDataPoints')}
      </button>
      <hr className="no-print" />
    </>
  )
}

export default ForestCharacteristics
