import React from 'react'
import { useUser } from '@client/store/user'
import { useTranslation } from 'react-i18next'
import { useAssessment, useAssessmentCountry, useCycle } from '@client/store/assessment/hooks'
import { useDispatch } from 'react-redux'
import { AssessmentActions } from '@client/store/assessment'
import { useCountryIso } from '@client/hooks'
import { Props } from '../props'

const ForestCharacteristics: React.FC<Props> = (props) => {
  const { disabled } = props
  const countryIso = useCountryIso()
  const assessment = useAssessment()
  const cycle = useCycle()
  const dispatch = useDispatch()

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
            AssessmentActions.postCountry({
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
          ? i18n.t('forestCharacteristics.dontUseOriginalDataPoints')
          : i18n.t('forestCharacteristics.useOriginalDataPoints')}
      </button>
      <hr className="no-print" />
    </>
  )
}

export default ForestCharacteristics
