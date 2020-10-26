import './logo.less'
import React from 'react'

import * as Fra from '@common/assessment/fra'
import * as PanEuropean from '@common/assessment/panEuropean'

import { useI18n } from '@webapp/components/hooks'
import AssessmentComponent from '@webapp/components/AssessmentComponent'

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
        <img alt="" src={`/img/fao/FAO${i18n.language}.svg`} />
        <img alt="" src="/img/partners/UNECE.gif" />
        <img alt="" src="/img/partners/ForestEurope.png" />
      </div>
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

const Logo = () => <AssessmentComponent components={Components} />

export default Logo
