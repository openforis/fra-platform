import React, { useMemo } from 'react'
import { createRoutesFromElements, Navigate, Route } from 'react-router-dom'

import { Routes } from 'meta/routes/routes'

import PageLayout from 'client/components/PageLayout'
import Assessment from 'client/pages/Assessment'
import Country from 'client/pages/Country'
import CountryHome from 'client/pages/CountryHome'
import Cycle from 'client/pages/Cycle'
import CycleHome from 'client/pages/CycleHome'
import Landing from 'client/pages/Landing'

export const useRoutes = () => {
  return useMemo(() => {
    const children = (
      <Route element={<PageLayout />} path="/">
        <Route index element={<Landing />} />
        <Route path={Routes.Assessment.path} element={<Assessment />}>
          <Route path={Routes.Cycle.path} element={<Cycle />}>
            {/*      Implement:      Admin            Login            User            */}
            <Route index element={<CycleHome />} />
            {/* Tutorials */}
            <Route path={Routes.Country.path} element={<Country />}>
              <Route index element={<Navigate to={Routes.CountryHome.path} replace />} />
              <Route path={`${Routes.CountryHome.path}/*`} element={<CountryHome />}>
                {/* user route */}
                {/* <Route path={ClientRoutes.Assessment.Cycle.Country.Users.User.path.relative} element={<User />} /> */}
              </Route>
              {/*
                Implement:
                   AssessmentPrint AssessmentDataDownload ( -> Renamed to DataDownload)
                  Geo DataExport AssessmentSection (-> Renamed to Section) OriginalDataPoint User
                  */}
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<Navigate to={Routes.Root.path} replace />} />
      </Route>
    )
    return createRoutesFromElements(children)
  }, [])
}
