import './CycleSwitcher.scss'
import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { ClientRoutes } from 'meta/app'
import { Cycle } from 'meta/assessment'

import { useAssessment, useCycle } from 'client/store/assessment'
import { useUserCycles } from 'client/store/user/hooks'
import { useCountryIso, useIsAdmin, useIsDataExportView } from 'client/hooks'
import Icon from 'client/components/Icon'
import PopoverControl from 'client/components/PopoverControl'

const CycleSwitcher = () => {
  const countryIso = useCountryIso()
  const navigate = useNavigate()
  const currentCycle = useCycle()
  const assessment = useAssessment()
  const isAdmin = useIsAdmin()
  const isDataExportView = useIsDataExportView()
  const userCycles = useUserCycles()

  const assessmentName = assessment.props.name
  const canSwitchCycle = isDataExportView || userCycles.length > 1

  const onCycleChange = useCallback(
    (cycleName: string) => {
      if (countryIso) navigate(ClientRoutes.Assessment.Cycle.Country.Landing.getLink({ countryIso, assessmentName, cycleName }))
      else if (isAdmin) navigate(ClientRoutes.Assessment.Cycle.Admin.Root.getLink({ assessmentName, cycleName }))
      else navigate(ClientRoutes.Assessment.Cycle.Landing.getLink({ assessmentName, cycleName }))
    },
    [assessmentName, countryIso, isAdmin, navigate]
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
