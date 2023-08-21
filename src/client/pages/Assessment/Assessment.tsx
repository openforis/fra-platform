import React from 'react'
import { Outlet } from 'react-router-dom'

import { useInitLanguage } from './hooks/useInitLanguage'
import { useTheme } from './hooks/useTheme'
import { useUserRedirect } from './hooks/useUserRedirect'

const Assessment: React.FC = () => {
  useInitLanguage()
  useUserRedirect()
  useTheme()

  return <Outlet />
}

export default Assessment
