import React from 'react'

import { useI18n } from '@webapp/components/hooks'
// import LinkHome from '../components/linkHome'
import LanguageSelection from '../components/languageSelection'

const PanEuropeanHeader = () => {
  const i18n = useI18n()

  return (
    <div className="app-header no-print">
      <img alt="FAO" src={`/img/fao/FAO${i18n.language}.svg`} />
      <div className="app-header__separator" />
      <div className="app-header__global-fra">{i18n.t('panEuropean.panEuropeanAssessment')}</div>

      <div className="app-header__menu">
        <LanguageSelection />
        {/* <LinkHome /> */}
      </div>
    </div>
  )
}

export default PanEuropeanHeader
