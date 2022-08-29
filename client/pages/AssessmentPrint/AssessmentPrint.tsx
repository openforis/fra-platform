import './style.scss'
import React, { memo, useEffect } from 'react'

import { AssessmentNames } from '@meta/assessment'

import { useAppDispatch } from '@client/store'
import { AssessmentActions, useAssessment, useCycle } from '@client/store/assessment'
import { useCountryIso } from '@client/hooks'
import Loading from '@client/components/Loading'

import FraPrint from './FraPrint'

const Components: Record<string, React.FC> = {
  [AssessmentNames.fra]: FraPrint,
}

const AssessmentPrint: React.FC = () => {
  const dispatch = useAppDispatch()
  const assessment = useAssessment()
  const cycle = useCycle()
  const countryIso = useCountryIso()

  useEffect(() => {
    if (assessment && cycle) {
      dispatch(
        AssessmentActions.getSections({ countryIso, assessmentName: assessment.props.name, cycleName: cycle.name })
      )
    }
  }, [assessment, countryIso, cycle, dispatch])

  if (!assessment) {
    return <Loading />
  }

  const Component = Components[assessment.props.name]

  return <div className="fra-print__container">{React.createElement(Component)}</div>
}

export default memo(AssessmentPrint)
