import './style.scss'
import React, { memo, useEffect } from 'react'

import { AssessmentName } from '@meta/assessment'

import { useAppDispatch } from '@client/store'
import { AssessmentActions, useAssessment, useCycle } from '@client/store/assessment'
import { useCountryIso } from '@client/hooks'
import Loading from '@client/components/Loading'

import FraPrint from './FraPrint'

const Components: Record<string, React.FC> = {
  [AssessmentName.fra]: FraPrint,
}

const AssessmentPrint: React.FC = () => {
  const dispatch = useAppDispatch()
  const assessment = useAssessment()
  const cycle = useCycle()
  const countryIso = useCountryIso()

  const Component = Components[assessment?.props.name]

  useEffect(() => {
    if (assessment && cycle) {
      dispatch(
        AssessmentActions.getSections({ countryIso, assessmentName: assessment.props.name, cycleName: cycle.name })
      )
    }
  }, [assessment, assessment.props.name, countryIso, cycle, dispatch])

  if (!assessment) {
    return <Loading />
  }

  return <div className="fra-print__container">{React.createElement(Component)}</div>
}

export default memo(AssessmentPrint)
