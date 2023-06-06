import './Header.scss'
import React from 'react'

import classNames from 'classnames'

import Icon from 'client/components/Icon'

import LinkLanding from './LinkLanding'

type Props = {
  showSections: boolean
  setShowSections: (showSections: boolean) => void
}

const Header: React.FC<Props> = (props) => {
  const { showSections, setShowSections } = props

  return (
    <div className="nav-header">
      <LinkLanding />

      <div className="nav-header__sep-container">
        <div className="hr" />
        <button
          type="button"
          className={classNames('btn-xs', 'btn-secondary', 'btn-transparent', 'btn-toggle')}
          onClick={() => setShowSections(!showSections)}
        >
          <Icon name="unfold" />
        </button>
      </div>
    </div>
  )
}

export default Header
