import React from 'react'
import { Outlet } from 'react-router'

import { useInitLanguage } from './hooks/useInitLanguage'
import { useTheme } from './hooks/useTheme'

const Assessment: React.FC = () => {
  useInitLanguage()
  useTheme()

  return <Outlet />
}

export default Assessment
