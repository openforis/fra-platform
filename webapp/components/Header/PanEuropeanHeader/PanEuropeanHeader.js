import React from 'react'
import { useI18n } from '@webapp/components/hooks'
import LinkHome from '../components/linkHome'
import LanguageSelection from '../components/languageSelection'
import Logo from '../Logo'

const PanEuropeanHeader = () => {
  const i18n = useI18n()
  return (
    <div className="app-header pan-european no-print">
      <LinkHome />
      <LanguageSelection />
      <div className="app-header__separator" />
      <div className="app-header__global-fra">{i18n.t('panEuropean.panEuropeanAssessment')}</div>

      <div className="app-header__menu">
        <Logo />
      </div>
    </div>
  )
}

export default PanEuropeanHeader
