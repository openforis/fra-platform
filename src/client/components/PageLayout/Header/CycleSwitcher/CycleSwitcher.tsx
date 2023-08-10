import './CycleSwitcher.scss'
import React from 'react'

import { useCycleRouteParams } from 'client/hooks/useRouteParams'
import Icon from 'client/components/Icon'
import PopoverControl from 'client/components/PopoverControl'

import { usePopoverItems } from './hooks/usePopoverItems'

const CycleSwitcher = () => {
  const { cycleName } = useCycleRouteParams()
  const popoverItems = usePopoverItems()

  if (popoverItems.length < 2) return <span className="cycle-switcher-locked">{cycleName}</span>

  return (
    <div className="cycle-switcher">
      <PopoverControl items={popoverItems}>
        <div className="app-header__menu-item">
          <span>{cycleName}</span>
          <Icon name="small-down" />
        </div>
      </PopoverControl>
    </div>
  )
}

export default CycleSwitcher
