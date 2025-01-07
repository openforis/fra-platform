import React from 'react'
import { Navigate } from 'react-router-dom'

import { AssessmentNames } from 'meta/assessment'
import { Routes } from 'meta/routes'

import { useAssessments } from 'client/store/assessment'

const PanEuropeanRedirect: React.FC = () => {
  const assessments = useAssessments()

  const panEuropean = assessments.find((assessment) => assessment.props.name === AssessmentNames.panEuropean)
  const cycle = panEuropean.cycles.reduce((acc, cycle) => {
    return acc.props.datePublished > cycle.props.datePublished ? acc : cycle
  })

  const assessmentName = panEuropean.props.name
  const cycleName = cycle.name

  return <Navigate to={Routes.Cycle.generatePath({ assessmentName, cycleName })} />
}

export default PanEuropeanRedirect
