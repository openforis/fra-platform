import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Areas } from 'meta/area/areas'

import { useCountries } from 'client/store/area/hooks/countries'
import { useNavigateToArea } from 'client/hooks/navigateToArea'
import Select, { Option, SelectSize } from 'client/components/Inputs/Select'

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

  return (
    <div className="home-area-selector__group">
      <img alt="" src="/img/iconCountries.svg" />
      <div>{t('common.countries')}</div>
      <Select onChange={navigateToArea} options={options} placeholder={t('common.select')} size={SelectSize.m} />
    </div>
  )
}

export default Countries
