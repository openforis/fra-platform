import React from 'react'
import { useTranslation } from 'react-i18next'

import { useCycle } from 'client/store/assessment'
import LinkHome from 'client/components/LinkHome'

import CycleSwitcher from '../CycleSwitcher'
import LanguageSelector, { LanguageSelectorMobile } from '../LanguageSelector'
import UserLinks from '../UserLinks'

const PanEuropeanHeader: React.FC = () => {
  const { i18n } = useTranslation()
  const cycle = useCycle()

  return (
    <div className="app-header no-print">
      <img alt="FAO" src={`/img/fao/FAO${i18n.language}.svg`} />
      <div className="app-header__separator" />
      <div className="app-header__global-fra">
        <div>{i18n.t('panEuropean.panEuropeanAssessment')}</div>
        {cycle && <CycleSwitcher />}
      </div>
      <LanguageSelectorMobile />

      <div className="app-header__menu">
        <LanguageSelector />
        <UserLinks />
        <LinkHome />
      </div>
    </div>
  )
}

export default PanEuropeanHeader
