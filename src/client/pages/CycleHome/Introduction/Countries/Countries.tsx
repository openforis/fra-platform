import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { AreaCode } from 'meta/area/areaCode'
import { Areas } from 'meta/area/areas'
import { TrackId } from 'meta/tracking/id'

import { useCountries } from 'client/store/area/hooks/countries'
import { useNavigateToArea } from 'client/hooks/navigateToArea'
import Select, { Option, SelectSize } from 'client/components/Inputs/Select'
import { Tracking } from 'client/utils/tracking'

const Countries: React.FC = () => {
  const { t } = useTranslation()
  const countries = useCountries()
  const navigateToArea = useNavigateToArea()

  const options = useMemo<Array<Option>>(() => {
    return countries.reduce<Array<Option>>((acc, country) => {
      const { countryIso } = country
      if (!Areas.isAtlantis(countryIso)) {
        const option = { label: t(Areas.getTranslationKey(countryIso)), value: countryIso }
        acc.push(option)
      }
      return acc
    }, [])
  }, [countries, t])

  const handleChange = (areaCode: AreaCode): void => {
    Tracking.capture('app_select', { element_id: TrackId.landingSelectCountries, value: areaCode })
    navigateToArea(areaCode)
  }

  return (
    <div className="home-area-selector__group">
      <img alt="" src="/img/iconCountries.svg" />
      <div>{t('common.countries')}</div>
      <Select onChange={handleChange} options={options} placeholder={t('common.select')} size={SelectSize.m} />
    </div>
  )
}

export default Countries
