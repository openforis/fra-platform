import React from 'react'
import { useTranslation } from 'react-i18next'

import LinkHome from '@client/components/LinkHome'

import LanguageSelector, { LanguageSelectorMobile } from '../LanguageSelector'
import UserLinks from '../UserLinks'

const FraHeader: React.FC = () => {
  const { i18n } = useTranslation()

  return (
    <div className="app-header no-print">
      <img alt="FAO" className="app-header__fao-logo" src={`/img/fao/FAO${i18n.language}.svg`} />
      <div className="app-header__separator" />
      <div className="app-header__global-fra">{i18n.t<string>('common.globalFRA')}</div>
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
