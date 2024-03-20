import React from 'react'
import { useTranslation } from 'react-i18next'

import { CountryIso } from 'meta/area'

import { useAppDispatch } from 'client/store'
import { AreaActions, useCountry, useIsUpdatingCountry } from 'client/store/area'
import { useHasOriginalDataPointData } from 'client/store/data'
import { useIsEditTableDataEnabled, useUser } from 'client/store/user'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import Button, { ButtonSize } from 'client/components/Buttons/Button'
import { useSectionContext } from 'client/pages/Section/context'

const ForestCharacteristics: React.FC = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()
  const user = useUser()
  const country = useCountry(countryIso)
  const { sectionName } = useSectionContext()
  const editEnabled = useIsEditTableDataEnabled(sectionName)
  const hasOriginalDataPointData = useHasOriginalDataPointData()
  const updatingCountry = useIsUpdatingCountry()
  const useOriginalDataPoint = country?.props?.forestCharacteristics?.useOriginalDataPoint

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
          disabled={!editEnabled || updatingCountry}
          inverse={useOriginalDataPoint}
          label={
            useOriginalDataPoint
              ? t('forestCharacteristics.dontUseOriginalDataPoints')
              : t('forestCharacteristics.useOriginalDataPoints')
          }
          onClick={() =>
            dispatch(AreaActions.updateCountryProp({ assessmentName, cycleName, countryIso, sectionName, countryProp }))
          }
          size={ButtonSize.m}
        />
      </div>

      <hr className="no-print" />
    </>
  )
}

export default ForestCharacteristics
