import './header.less'
import React from 'react'

import Logo from './Logo'
import UserLinks from './UserLinks'
import LanguageSelection from './components/languageSelection'
import LinkHome from './components/linkHome'

const Header = () => (
  <div className="app-header no-print">
    <Logo />

    <div className="app-header__menu">
      <LanguageSelection />
      <UserLinks />
      <LinkHome />
    </div>
  </div>
)

export default Header
