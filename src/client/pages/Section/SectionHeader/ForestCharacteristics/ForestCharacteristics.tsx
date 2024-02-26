import React from 'react'
import { useTranslation } from 'react-i18next'

import { CountryIso } from 'meta/area'

import { useAppDispatch } from 'client/store'
import { AreaActions, useAssessmentCountry, useIsUpdatingCountry } from 'client/store/area'
import { useHasOriginalDataPointData } from 'client/store/data'
import { useUser } from 'client/store/user'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import Button, { ButtonSize } from 'client/components/Buttons/Button'

import { Props } from '../props'

const sectionName = 'forestCharacteristics'

const ForestCharacteristics: React.FC<Props> = (props) => {
  const { disabled } = props

  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()
  const user = useUser()
  const country = useAssessmentCountry()
  const useOriginalDataPoint = country?.props?.forestCharacteristics?.useOriginalDataPoint
  const hasOriginalDataPointData = useHasOriginalDataPointData()
  const updatingCountry = useIsUpdatingCountry()

  if (!user || !hasOriginalDataPointData || !country) {
    return null
  }

  const countryProp = {
    forestCharacteristics: {
      useOriginalDataPoint: !country.props.forestCharacteristics.useOriginalDataPoint,
    },
  }

  return (
    <>
      <div className="justify_start">
        <Button
          disabled={disabled || updatingCountry}
          inverse={useOriginalDataPoint}
          label={
            useOriginalDataPoint
              ? t('forestCharacteristics.dontUseOriginalDataPoints')
              : t('forestCharacteristics.useOriginalDataPoints')
          }
          size={ButtonSize.m}
          onClick={() =>
            dispatch(AreaActions.updateCountryProp({ assessmentName, cycleName, countryIso, sectionName, countryProp }))
          }
        />
      </div>

      <hr className="no-print" />
    </>
  )
}

export default ForestCharacteristics
