import React from 'react'
import LinkHome from '@webapp/components/Header/components/linkHome'
import LanguageSelection from '@webapp/components/Header/components/languageSelection'
import Logo from '@webapp/components/Header/Logo'
import UserLinks from '@webapp/components/Header/UserLinks'

const FraHeader = () => (
  <div className="app-header no-print">
    <Logo />

    <div className="app-header__menu">
      <LanguageSelection />
      <UserLinks />
      <LinkHome />
    </div>
  </div>
)

export default FraHeader
