import React, { useMemo } from 'react'
import { createRoutesFromElements, Route } from 'react-router-dom'

import { Routes } from 'meta/routes/routes'

import PageLayout from 'client/components/PageLayout'
import Assessment from 'client/pages/Assessment'
import Cycle from 'client/pages/Cycle'

export const useRoutes = () => {
  return useMemo(() => {
    const children = (
      <Route element={<PageLayout />} path="/">
        <Route path={Routes.Assessment.path} element={<Assessment />}>
          <Route path={Routes.Cycle.path} element={<Cycle />} />
        </Route>
      </Route>
    )
    return createRoutesFromElements(children)
  }, [])
}
