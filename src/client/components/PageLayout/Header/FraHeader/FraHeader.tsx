import React from 'react'
import { useTranslation } from 'react-i18next'

import { useCycle } from 'client/store/assessment'
import { useLanguage } from 'client/hooks/useLanguage'
import LinkHome from 'client/components/LinkHome'

import CycleSwitcher from '../CycleSwitcher'
import LanguageSelector, { LanguageSelectorMobile } from '../LanguageSelector'
import UserLinks from '../UserLinks'

const FraHeader: React.FC = () => {
  const { t } = useTranslation()
  const cycle = useCycle()
  const lang = useLanguage()

  return (
    <header className="app-header no-print">
      <img alt="FAO" className="app-header__fao-logo" src={`/img/fao/FAO${lang}.svg`} />
      <div className="app-header__separator" />
      <div className="app-header__global-fra">
        <div>{t('common.globalFRA')}</div>

        {cycle && <CycleSwitcher />}
      </div>

      <LanguageSelectorMobile />

      <div className="app-header__menu">
        <LanguageSelector />
        <UserLinks />
        <LinkHome />
      </div>
    </header>
  )
}

export default FraHeader
