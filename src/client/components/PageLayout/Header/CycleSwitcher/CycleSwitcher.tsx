import './CycleSwitcher.scss'
import React from 'react'

import { Assessments } from 'meta/assessment'

import { useAssessment } from 'client/store/assessment'
import { useCycleRouteParams } from 'client/hooks/useRouteParams'
import Icon from 'client/components/Icon'
import PopoverControl from 'client/components/PopoverControl'

import { usePopoverItems } from './hooks/usePopoverItems'

const CycleSwitcher = () => {
  const assessment = useAssessment()
  const { cycleName } = useCycleRouteParams()
  const popoverItems = usePopoverItems()

  if (popoverItems.length < 1) return null

  const latestCycle = Assessments.getLastCreatedCycle(assessment)
  const displayName = latestCycle.name === cycleName ? '' : cycleName

  return (
    <div className="cycle-switcher">
      <PopoverControl items={popoverItems}>
        <div className="app-header__menu-item">
          <span>{displayName}</span>
          <Icon name="small-down" />
        </div>
      </PopoverControl>
    </div>
  )
}

export default CycleSwitcher
