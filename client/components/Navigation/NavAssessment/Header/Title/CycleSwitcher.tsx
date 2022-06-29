import './CycleSwitcher.scss'
import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'

import { Authorizer } from '@meta/user'

import { useAssessment, useCycle } from '@client/store/assessment'
import { useIsDataLocked } from '@client/store/ui/dataLock'
import { useUser } from '@client/store/user'
import { useCountryIso } from '@client/hooks'
import { BasePaths } from '@client/basePaths'

const CycleSwitcher = () => {
  const countryIso = useCountryIso()
  const history = useHistory()
  const cycleCurrent = useCycle()
  const assessment = useAssessment()
  const user = useUser()
  const isDataLocked = useIsDataLocked()

  const userCycles = assessment.cycles.filter((cycle) => Authorizer.canView({ countryIso, user, cycle, assessment }))
  const canSwitchCycle = user && isDataLocked && userCycles.length > 1

  const onSelectChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      history.push(BasePaths.Assessment.home(countryIso, assessment.props.name, event.target.value))
    },
    [assessment.props.name, countryIso, history]
  )

  if (!canSwitchCycle) return <span>{cycleCurrent.name}</span>

  return (
    <select className="cycle-switcher" value={cycleCurrent.name} onChange={onSelectChange}>
      {assessment.cycles.map((cycle) => (
        <option key={cycle.uuid} value={cycle.name}>
          {cycle.name}
        </option>
      ))}
    </select>
  )
}

export default CycleSwitcher
