import React, {useCallback} from 'react'
import { useNavigate } from 'react-router-dom'

import { Authorizer } from '@meta/user'

import { useAssessment, useCycle } from '@client/store/assessment'
import { useIsDataLocked } from '@client/store/ui/dataLock'
import { useUser } from '@client/store/user'
import { useCountryIso } from '@client/hooks'
import { ClientRoutes } from '@client/clientRoutes'

const CycleSwitcher = () => {
  const countryIso = useCountryIso()
  const navigate = useNavigate()
  const cycleCurrent = useCycle()
  const assessment = useAssessment()
  const user = useUser()
  const isDataLocked = useIsDataLocked()

  const userCycles = assessment.cycles.filter((cycle) => Authorizer.canView({ countryIso, user, cycle, assessment }))
  const canSwitchCycle = user && isDataLocked && userCycles.length > 1

  const onSelectChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    navigate(
      ClientRoutes.Assessment.Home.Root.getLink({
        countryIso,
        assessmentName: assessment.props.name,
        cycleName: event.target.value,
      })
    )
  },[assessment.props.name, countryIso, navigate])

  if (!canSwitchCycle) return <span>{cycleCurrent.name}</span>

  return (
    <select onChange={onSelectChange}>
      {assessment.cycles.map((cycle) => (
        <option key={cycle.uuid}>{cycle.name}</option>
      ))}
    </select>
  )
}

export default CycleSwitcher
