import React from 'react'
import { useTranslation } from 'react-i18next'

import { useCycle } from 'client/store/assessment'
import LinkHome from 'client/components/LinkHome'

import CycleSwitcher from '../CycleSwitcher'
import UserLinks from '../UserLinks'

const PanEuropeanHeader: React.FC = () => {
  const { t, i18n } = useTranslation()
  const cycle = useCycle()

  return (
    <header className="app-header no-print">
      <img alt="FAO" src={`/img/fao/FAO${i18n.resolvedLanguage}.svg`} />
      <div className="app-header__separator" />
      <div className="app-header__global-fra">
        <div>{t('panEuropean.panEuropeanAssessment')}</div>
        {cycle && <CycleSwitcher />}
      </div>

      <div className="app-header__menu">
        <UserLinks />
        <LinkHome />
      </div>
    </header>
  )
}

export default PanEuropeanHeader
