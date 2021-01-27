import './style.less'
import React from 'react'
import { useI18n } from '@webapp/components/hooks'
import LinkHome from '../components/linkHome'
import LanguageSelection from '../components/languageSelection'

const PanEuropeanHeader = () => {
  const i18n = useI18n()
  return (
    <div className="app-header no-print">
      <div>
        <LinkHome />
        <LanguageSelection />
      </div>
      <div className="app-header__separator" />
      <div className="app-header__global-fra">{(i18n as any).t('panEuropean.panEuropeanAssessment')}</div>

      <div className="app-header__menu">
        <div className="logo-pan-eu">
          <img alt="" src={`/img/fao/FAO${(i18n as any).language}.svg`} />
          <img alt="" src="/img/partners/UNECE.gif" />
          <img alt="" src="/img/partners/ForestEurope.png" />
        </div>
      </div>
    </div>
  )
}
export default PanEuropeanHeader
