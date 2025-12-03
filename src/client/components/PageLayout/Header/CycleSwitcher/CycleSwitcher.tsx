import './CycleSwitcher.scss'
import React from 'react'

import { Assessments } from 'meta/assessment/assessments'
import { Cycles } from 'meta/assessment/cycles'

import { useAssessment } from 'client/store/meta/hooks/assessments'
import { useCycle } from 'client/store/meta/hooks/cycles'
import { useCycleRouteParams } from 'client/hooks/routeParams'
import Icon from 'client/components/Icon'
import PopoverControl from 'client/components/PopoverControl'

import { usePopoverItems } from './hooks/usePopoverItems'

const CycleSwitcher: React.FC = () => {
  const assessment = useAssessment()
  const cycle = useCycle()
  const { cycleName } = useCycleRouteParams()
  const popoverItems = usePopoverItems()

  if (popoverItems.length < 1) {
    const cycleLabel = Cycles.isPublished(cycle) ? cycleName : Assessments.getLastPublishedCycle(assessment).name
    return <div>{cycleLabel}</div>
  }

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
