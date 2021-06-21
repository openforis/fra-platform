import React from 'react'

import { useI18n } from '@webapp/components/hooks'

import LinkHome from '@webapp/components/Header/components/linkHome'
import LanguageSelector, { LanguageSelectorMobile } from '@webapp/components/Header/LanguageSelector'
import UserLinks from '@webapp/components/Header/UserLinks'

const FraHeader: React.FC = () => {
  const i18n = useI18n()

  return (
    <div className="app-header no-print">
      <img alt="FAO" className="app-header__fao-logo" src={`/img/fao/FAO${i18n.language}.svg`} />
      <div className="app-header__separator" />
      <div className="app-header__global-fra">{i18n.t('common.globalFRA')}</div>
      <LanguageSelectorMobile />

      <div className="app-header__menu">
        <LanguageSelector />
        <UserLinks />
        <LinkHome />
      </div>
    </div>
  )
}

export default FraHeader
