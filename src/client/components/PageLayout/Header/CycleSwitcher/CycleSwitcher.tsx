import './CycleSwitcher.scss'
import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { ClientRoutes } from '@meta/app'
import { Cycle } from '@meta/assessment'
import { Authorizer } from '@meta/user'

import { useAssessment, useCycle } from '@client/store/assessment'
import { useIsDataLocked } from '@client/store/ui/dataLock'
import { useUser } from '@client/store/user'
import { useCountryIso, useIsDataExportView } from '@client/hooks'
import Icon from '@client/components/Icon'
import PopoverControl from '@client/components/PopoverControl'

const CycleSwitcher = () => {
  const countryIso = useCountryIso()
  const navigate = useNavigate()
  const currentCycle = useCycle()
  const assessment = useAssessment()
  const user = useUser()
  const isDataLocked = useIsDataLocked()
  const isDataExportView = useIsDataExportView()

  const assessmentName = assessment.props.name
  const userCycles = assessment.cycles.filter((cycle) => Authorizer.canView({ countryIso, user, cycle, assessment }))
  const canSwitchCycle = (isDataLocked || isDataExportView) && userCycles.length > 1

  const onCycleChange = useCallback(
    (cycleName: string) => {
      if (countryIso)
        navigate(ClientRoutes.Assessment.Cycle.Country.Landing.getLink({ countryIso, assessmentName, cycleName }))
      else navigate(ClientRoutes.Assessment.Cycle.Landing.getLink({ assessmentName, cycleName }))
    },
    [assessmentName, countryIso, navigate]
  )

  if (!canSwitchCycle) return <span className="cycle-switcher-locked">{currentCycle.name}</span>

  const items = assessment.cycles.map((cycle: Cycle) => ({
    content: cycle.name,
    onClick: () => onCycleChange(cycle.name),
  }))

  return (
    <div className="cycle-switcher">
      <PopoverControl items={items}>
        <div className="app-header__menu-item">
          <span>{currentCycle.name}</span>
          <Icon name="small-down" />
        </div>
      </PopoverControl>
    </div>
  )
}

export default CycleSwitcher
