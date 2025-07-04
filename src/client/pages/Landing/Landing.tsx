import React from 'react'
import { Navigate } from 'react-router-dom'

import { useRedirectUrl } from './hooks/useRedirectUrl'

const Landing: React.FC = () => {
  const url = useRedirectUrl()

  return <Navigate replace to={url} />
}

export default Landing
