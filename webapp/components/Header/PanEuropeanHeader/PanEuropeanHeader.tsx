import React from 'react'

import { useI18n } from '@webapp/components/hooks'

import LanguageSelector, { LanguageSelectorMobile } from '@webapp/components/Header/LanguageSelector'

const PanEuropeanHeader: React.FC = () => {
  const i18n = useI18n()

  return (
    <div className="app-header no-print">
      <img alt="FAO" src={`/img/fao/FAO${i18n.language}.svg`} />
      <div className="app-header__separator" />
      <div className="app-header__global-fra">{i18n.t('panEuropean.panEuropeanAssessment')}</div>
      <LanguageSelectorMobile />

      <div className="app-header__menu">
        <LanguageSelector />
      </div>
    </div>
  )
}

export default PanEuropeanHeader
