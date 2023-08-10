import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { ClientRoutes } from 'meta/app'

import Cycle from 'client/pages/Cycle'
import Tutorials from 'client/pages/Tutorials'

import { useInitLanguage } from './hooks/useInitLanguage'
import { useTheme } from './hooks/useTheme'
import { useUserRedirect } from './hooks/useUserRedirect'

const Assessment: React.FC = () => {
  useInitLanguage()
  useUserRedirect()
  useTheme()

  return (
    <Routes>
      <Route path={`${ClientRoutes.Assessment.Tutorials.path.relative}`} element={<Tutorials />} />

      <Route path={`${ClientRoutes.Assessment.Cycle.Landing.path.relative}/*`} element={<Cycle />} />
    </Routes>
  )
}

export default Assessment
