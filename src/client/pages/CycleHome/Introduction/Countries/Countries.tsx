import React from 'react'
import { useTranslation } from 'react-i18next'

import AreaSelector from 'client/components/AreaSelector/AreaSelector'

const Countries = () => {
  const { t } = useTranslation()

  return (
    <div className="home-area-selector__group">
      <img alt="" src="/img/iconCountries.svg" />
      <div>{t('common.countries')}</div>
      <AreaSelector includeCountries placeholder="common.select" userCountries />
    </div>
  )
}

export default Countries
