import './Header.scss'
import React from 'react'

import Button, { ButtonSize, ButtonType } from 'client/components/Buttons/Button'
import Hr from 'client/components/Hr'

import LinkLanding from './LinkLanding'

type Props = {
  showSections: boolean
  setShowSections: (showSections: boolean) => void
}

const Header: React.FC<Props> = (props) => {
  const { setShowSections, showSections } = props

  return (
    <div className="nav-header">
      <LinkLanding />

      <div className="nav-header__sep-container">
        <Hr />
        <Button
          className="btn-toggle"
          iconName="unfold"
          inverse
          onClick={() => setShowSections(!showSections)}
          size={ButtonSize.m}
          type={ButtonType.anonymous}
        />
      </div>
    </div>
  )
}

export default Header
