import React, { useMemo } from 'react'
import { createRoutesFromElements, Navigate, Route } from 'react-router-dom'

import { Routes } from 'meta/routes/routes'

import PageLayout from 'client/components/PageLayout'
import Assessment from 'client/pages/Assessment'
import Country from 'client/pages/Country'
import SectionWrapper from 'client/pages/Country/SectionWrapper'
import CountryHome from 'client/pages/CountryHome'
import Cycle from 'client/pages/Cycle'
import CycleHome from 'client/pages/CycleHome'
import Landing from 'client/pages/Landing'
import OriginalDataPoint from 'client/pages/OriginalDataPoint'
import SectionDataExportSwitch from 'client/pages/SectionDataExportSwitch'
import User from 'client/pages/User'

export const useRoutes = () => {
  return useMemo(() => {
    const children = (
      <Route element={<PageLayout />} path="/">
        <Route index element={<Landing />} />
        <Route path={Routes.Assessment.path} element={<Assessment />}>
          <Route path={Routes.Cycle.path} element={<Cycle />}>
            {/*      Implement:      Admin            Login            User            */}
            <Route index element={<CycleHome />} />
            <Route path={Routes.Country.path} element={<Country />}>
              <Route index element={<Navigate to={Routes.CountryHome.path} replace />} />
              <Route path={`${Routes.CountryHome.path}/*`} element={<CountryHome />} />
              <Route path={Routes.CountryUser.path} element={<User />} />
              <Route
                path={Routes.OriginalDataPoint.path}
                element={
                  <SectionWrapper>
                    <OriginalDataPoint />
                  </SectionWrapper>
                }
              />
              <Route path={Routes.Section.path} element={<SectionDataExportSwitch />} />
              {/* user route */}
              {/* <Route path={ClientRoutes.Assessment.Cycle.Country.Users.User.path.relative} element={<User />} /> */}
              {/*
                Implement:
                   AssessmentPrint AssessmentDataDownload ( -> Renamed to DataDownload)
                  Geo User
                  */}
            </Route>
            {/* Tutorials */}
          </Route>
        </Route>
        <Route path="*" element={<Navigate to={Routes.Root.path} replace />} />
      </Route>
    )
    return createRoutesFromElements(children)
  }, [])
}
