import './CycleSwitcher.scss'
import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { ClientRoutes } from '@meta/app'
import { Areas } from '@meta/area'
import { Authorizer } from '@meta/user'

import { useAssessment, useCycle } from '@client/store/assessment'
import { useIsDataLocked } from '@client/store/ui/dataLock'
import { useUser } from '@client/store/user'
import { useCountryIso } from '@client/hooks'

const CycleSwitcher = () => {
  const countryIso = useCountryIso()
  const navigate = useNavigate()
  const cycleCurrent = useCycle()
  const assessment = useAssessment()
  const user = useUser()
  const isDataLocked = useIsDataLocked()
  const isDataExport = countryIso && !Areas.isISOCountry(countryIso)

  const assessmentName = assessment.props.name
  const userCycles = assessment.cycles.filter((cycle) => Authorizer.canView({ countryIso, user, cycle, assessment }))
  const canSwitchCycle = user && (isDataLocked || isDataExport) && userCycles.length > 1

  const onSelectChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const cycleName = event.target.value
      navigate(ClientRoutes.Assessment.Home.Root.getLink({ countryIso, assessmentName, cycleName }))
    },
    [assessmentName, countryIso, navigate]
  )

  if (!canSwitchCycle) return <span className="cycle-switcher-locked">{cycleCurrent.name}</span>

  return (
    <select className="cycle-switcher" onChange={onSelectChange} value={cycleCurrent.name}>
      {assessment.cycles.map((cycle) => (
        <option key={cycle.uuid} value={cycle.name}>
          {cycle.name}
        </option>
      ))}
    </select>
  )
}

export default CycleSwitcher
