import React from 'react'
import { useTranslation } from 'react-i18next'

import { useAppDispatch } from '@client/store'
import { AssessmentActions, useAssessment, useAssessmentCountry, useCycle } from '@client/store/assessment'
import { useUser } from '@client/store/user'
import { useCountryIso } from '@client/hooks'

import { Props } from '../props'

const ForestCharacteristics: React.FC<Props> = (props) => {
  const { disabled } = props
  const countryIso = useCountryIso()
  const assessment = useAssessment()
  const cycle = useCycle()
  const dispatch = useAppDispatch()

  const user = useUser()
  const i18n = useTranslation()

  // TODO: Implement this
  const extentOfForestStateHasOdps = true // TODO? useSelector(ExtentOfForestState.hasOriginalDataPoints)
  // const forestCharacteristicsHasOdps = true // TODO?useSelector(ForestCharacteristicsState.hasOriginalDataPoints)
  const country = useAssessmentCountry()
  const forestCharacteristicsHasOdps = country?.props.forestCharacteristics.useOriginalDataPoint
  if (!user || !extentOfForestStateHasOdps || !country) {
    return null
  }
  return (
    <>
      <button
        type="button"
        className={`btn btn-${forestCharacteristicsHasOdps ? 'secondary' : 'primary'} no-print`}
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
                    useOriginalDataPoint: !country.props.forestCharacteristics.useOriginalDataPoint,
                  },
                },
              },
            })
          )
        }
        disabled={disabled}
      >
        {forestCharacteristicsHasOdps
          ? i18n.t<string>('forestCharacteristics.dontUseOriginalDataPoints')
          : i18n.t<string>('forestCharacteristics.useOriginalDataPoints')}
      </button>
      <hr className="no-print" />
    </>
  )
}

export default ForestCharacteristics
