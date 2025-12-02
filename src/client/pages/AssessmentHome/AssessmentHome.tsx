import React from 'react'
import { Navigate } from 'react-router'

import { useAssessment } from 'client/store/meta/hooks/assessments'
import { useRedirectUrl } from 'client/pages/Landing/hooks/useRedirectUrl'

const AssessmentHome: React.FC = () => {
  const assessment = useAssessment()

  const url = useRedirectUrl({ assessment })

  return <Navigate replace to={url} />
}

export default AssessmentHome
