import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { ClientRoutes } from 'meta/app'

import Cycle from '../Cycle'
import Tutorials from '../Tutorials'

const Assessment: React.FC = () => {
  return (
    <Routes>
      <Route path={`${ClientRoutes.Assessment.Tutorials.path.relative}`} element={<Tutorials />} />

      <Route path={`${ClientRoutes.Assessment.Cycle.Landing.path.relative}/*`} element={<Cycle />} />
    </Routes>
  )
}

export default Assessment
