import './logo.less'
import React from 'react'

import * as Fra from '@common/assessment/fra'
import * as PanEuropean from '@common/assessment/panEuropean'

import { useI18n, useIsAdmin, useIsHome, useIsLogin } from '@webapp/components/hooks'
import { useAssessmentType } from '@webapp/store/app'

const LogoFRA = () => {
  const i18n = useI18n()
  return (
    <>
      <img alt="FAO" src={`/img/fao/FAO${i18n.language}.svg`} />
      <div className="app-header__separator" />
      <div className="app-header__global-fra">{i18n.t('common.globalFRA')}</div>
    </>
  )
}

const LogoPanEuropean = () => {
  const i18n = useI18n()
  return (
    <>
      <div className="logo-pan-eu">
        <img alt="" src="/img/partners/UNECE.gif" />
        <img alt="" src="/img/partners/ForestEurope.png" />
      </div>
      <div className="app-header__separator" />
      <div className="app-header__global-fra">{i18n.t('panEuropean.panEuropeanAssessment')}</div>
    </>
  )
}

const LogoPlaceholder = () => (
  <>
    <div />
    <div className="app-header__separator" />
    <div />
  </>
)

const Components = {
  [Fra.type]: LogoFRA,
  [PanEuropean.type]: LogoPanEuropean,
  null: LogoPlaceholder,
}

const Logo = () => {
  const isAdmin = useIsAdmin()
  const isHome = useIsHome()
  const isLogin = useIsLogin()
  const assessmentType = useAssessmentType()

  if (isAdmin || isHome || isLogin) {
    return <LogoFRA />
  }

  return React.createElement(Components[assessmentType])
}

export default Logo
