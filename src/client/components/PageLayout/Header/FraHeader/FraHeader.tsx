import React from 'react'
import { useTranslation } from 'react-i18next'
import MediaQuery from 'react-responsive'

import { useCycle } from 'client/store/meta/hooks/cycles'
import { useLanguage } from 'client/hooks/useLanguage'
import LinkHome from 'client/components/LinkHome'
import CycleSwitcher from 'client/components/PageLayout/Header/CycleSwitcher'
import LanguageSelector, { LanguageSelectorMobile } from 'client/components/PageLayout/Header/LanguageSelector'
import UserLinks from 'client/components/PageLayout/Header/UserLinks'
import { Breakpoints } from 'client/utils'

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

      <MediaQuery maxWidth={Breakpoints.laptop - 1}>
        <LanguageSelectorMobile />
      </MediaQuery>

      <div className="app-header__menu">
        <LanguageSelector />
        <UserLinks />
        <LinkHome />
      </div>
    </header>
  )
}

export default FraHeader
