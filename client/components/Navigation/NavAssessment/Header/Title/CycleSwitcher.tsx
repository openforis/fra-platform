import React from 'react'
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
  const cycle = useCycle()
  const assessment = useAssessment()
  const user = useUser()
  const isDataLocked = useIsDataLocked()

  const userCycles = assessment.cycles.filter((cycle) =>
    Authorizer.canView({
      countryIso,
      user,
      cycle,
      assessment,
    })
  )

  const canSwitchCycle = user && isDataLocked && userCycles.length > 1

  if (!canSwitchCycle) return <span>{cycle.name}</span>

  const onSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    history.push(BasePaths.Assessment.home(countryIso, assessment.props.name, event.target.value))
  }

  return (
    <select onChange={onSelectChange}>
      {assessment.cycles.map((cycle) => (
        <option key={cycle.uuid}>{cycle.name}</option>
      ))}
    </select>
  )
}

export default CycleSwitcher
