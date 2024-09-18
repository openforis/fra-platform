import React from 'react'
import { Navigate } from 'react-router-dom'

import { AssessmentNames, Cycles } from 'meta/assessment'
import { Routes } from 'meta/routes'

import { useAssessments } from 'client/store/assessment'

const PanEuropeanRedirect: React.FC = () => {
  const assessments = useAssessments()

  const panEuropean = assessments.find((assessment) => assessment.props.name === AssessmentNames.panEuropean)
  // TODO: find a better way to sort cycles (add created time ?)
  const cycles = [...panEuropean.cycles].sort((c1, c2) => Number(c2.name) - Number(c1.name))
  // find the last published cycle
  const cycle = cycles.find((c) => Cycles.isPublished(c))

  const assessmentName = panEuropean.props.name
  const cycleName = cycle.name

  return <Navigate to={Routes.Cycle.generatePath({ assessmentName, cycleName })} />
}

export default PanEuropeanRedirect
