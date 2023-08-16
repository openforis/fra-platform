import React, { useMemo } from 'react'
import { createRoutesFromElements, Route } from 'react-router-dom'

import { Routes } from 'meta/routes/routes'

import PageLayout from 'client/components/PageLayout'
import Assessment from 'client/pages/Assessment'
import Country from 'client/pages/Country'
import Cycle from 'client/pages/Cycle'
import CycleLanding from 'client/pages/CycleLanding'
import Landing from 'client/pages/Landing'

export const useRoutes = () => {
  return useMemo(() => {
    const children = (
      <Route element={<PageLayout />} path="/">
        <Route index element={<Landing />} />
        <Route path={Routes.Assessment.path} element={<Assessment />}>
          <Route path={Routes.Cycle.path} element={<Cycle />}>
            <Route index element={<CycleLanding />} />
            {/* Tutorials */}
            <Route path={Routes.Country.path} element={<Country />}>
              {/*
              AssessmentHome
              AssessmentPrint
              AssessmentDataDownload
              Geo
              DataExport
              AssessmentSection
              OriginalDataPoint
              User
              */}
            </Route>
          </Route>
        </Route>
      </Route>
    )
    return createRoutesFromElements(children)
  }, [])
}
