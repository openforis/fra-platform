import React from 'react'
import LinkHome from '@webapp/components/Header/components/linkHome'
import LanguageSelection from '@webapp/components/Header/components/languageSelection'
import UserLinks from '@webapp/components/Header/UserLinks'
import { useI18n } from '@webapp/components/hooks'

const FraHeader = () => {
  const i18n = useI18n()

  return (
    <div className="app-header no-print">
      <img alt="FAO" src={`/img/fao/FAO${(i18n as any).language}.svg`} />
      <div className="app-header__separator" />
      <div className="app-header__global-fra">{(i18n as any).t('common.globalFRA')}</div>

      <div className="app-header__menu">
        <LanguageSelection />
        <UserLinks />
        <LinkHome />
      </div>
    </div>
  )
}
export default FraHeader
