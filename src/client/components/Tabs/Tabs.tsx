import './Tabs.scss'
import React from 'react'
import { NavLink } from 'react-router'

import { ButtonSize, useButtonClassName } from 'client/components/Buttons/Button'
import { TabItem } from 'client/components/Tabs/types'

type Props = {
  dataTestId?: string
  items: Array<TabItem>
}

const Tabs: React.FC<Props> = (props) => {
  const { dataTestId, items } = props

  const className = useButtonClassName({ className: 'tabs__item', inverse: true, noBorder: true, size: ButtonSize.m })

  return (
    <div className="tabs" data-testid={dataTestId}>
      {items.map(({ label, to }) => (
        <NavLink key={to} className={className} to={to}>
          {label}
        </NavLink>
      ))}
    </div>
  )
}

export default Tabs
