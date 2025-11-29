import React from 'react'
import { Navigate } from 'react-router'

import { useAssessmentDefault } from 'client/store/meta/hooks/assessments'

import { useRedirectUrl } from './hooks/useRedirectUrl'

const Landing: React.FC = () => {
  const assessment = useAssessmentDefault()
  const url = useRedirectUrl({ assessment })

  return <Navigate replace to={url} />
}

export default Landing
