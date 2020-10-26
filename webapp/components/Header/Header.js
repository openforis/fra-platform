import './header.less'
import React from 'react'

import * as PanEuropean from '@common/assessment/panEuropean'
import { useAssessmentType } from '@webapp/store/app'
import { useI18n } from '@webapp/components/hooks'

import Logo from './Logo'
import UserLinks from './UserLinks'
import LanguageSelection from './components/languageSelection'
import LinkHome from './components/linkHome'

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

const FRAHeader = () => (
  <div className="app-header no-print">
    <Logo />

    <div className="app-header__menu">
      <LanguageSelection />
      <UserLinks />
      <LinkHome />
    </div>
  </div>
)

const Header = () => {
  const assessmentType = useAssessmentType()
  const isPanEuropean = assessmentType === PanEuropean.type
  return isPanEuropean ? <PanEuropeanHeader /> : <FRAHeader />
}

export default Header
