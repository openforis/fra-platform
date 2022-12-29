import './CycleSwitcher.scss'
import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { ClientRoutes } from '@meta/app'
import { Authorizer } from '@meta/user'

import { useAssessment, useCycle } from '@client/store/assessment'
import { useIsDataLocked } from '@client/store/ui/dataLock'
import { useUser } from '@client/store/user'
import { useCountryIso, useIsDataExportView } from '@client/hooks'

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

  const onSelectChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const cycleName = event.target.value
      if (countryIso)
        navigate(ClientRoutes.Assessment.Cycle.Country.Landing.getLink({ countryIso, assessmentName, cycleName }))
      else navigate(ClientRoutes.Assessment.Cycle.Landing.getLink({ assessmentName, cycleName }))
    },
    [assessmentName, countryIso, navigate]
  )

  if (!canSwitchCycle) return <span className="cycle-switcher-locked">{currentCycle.name}</span>

  return (
    <select className="cycle-switcher" onChange={onSelectChange} value={currentCycle.name}>
      {assessment.cycles.map((cycle) => (
        <option key={cycle.uuid} value={cycle.name}>
          {cycle.name}
        </option>
      ))}
    </select>
  )
}

export default CycleSwitcher
