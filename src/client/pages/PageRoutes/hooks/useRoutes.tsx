import React, { Suspense, useMemo } from 'react'
import { createRoutesFromElements, Navigate, Route, RouteObject } from 'react-router'

import { RegionCode } from 'meta/area/regionCode'
import { Routes } from 'meta/routes/routes'

import PageLayout from 'client/components/PageLayout'
import AdminCollaborators from 'client/pages/AdminCollaborators'
import AdminCountries from 'client/pages/AdminCountries'
import AdminInvitations from 'client/pages/AdminInvitations'
import AdminLinks from 'client/pages/AdminLinks'
import Assessment from 'client/pages/Assessment'
import AssessmentHome from 'client/pages/AssessmentHome'
import Country from 'client/pages/Country'
import SectionWrapper from 'client/pages/Country/SectionWrapper'
import CountryHome from 'client/pages/CountryHome'
import Cycle from 'client/pages/Cycle'
import CycleHome from 'client/pages/CycleHome'
import Landing from 'client/pages/Landing'
import PanEuropeanRedirect from 'client/pages/PanEuropeanRedirect'
import Print from 'client/pages/Print'
import SectionAreaSwitch from 'client/pages/SectionAreaSwitch'
import Tutorials from 'client/pages/Tutorials'

import { KioskRoutes } from './_KioskRoutes'

const AuthenticationLazy = React.lazy(() => import('client/pages/Authentication/Authentication'))
const OriginalDataPointLazy = React.lazy(() => import('client/pages/OriginalDataPoint'))
const AdminLazy = React.lazy(() => import('client/pages/Admin'))
const UserLazy = React.lazy(() => import('client/pages/User'))
const GeoLazy = React.lazy(() => import('client/pages/Geo'))
const DataDownloadLazy = React.lazy(() => import('client/pages/DataDownload'))

export const useRoutes = (): Array<RouteObject> => {
  return useMemo(() => {
    const children = (
      <>
        <Route element={<PageLayout />} path="/">
          <Route element={<Landing />} index />

          <Route element={<Assessment />} path={Routes.Assessment.path.relative}>
            <Route element={<AssessmentHome />} index />
            <Route element={<Cycle />} path={Routes.Cycle.path.relative}>
              <Route element={<CycleHome />} index />

              {/* Admin */}
              <Route
                element={
                  <Suspense>
                    <AdminLazy />
                  </Suspense>
                }
                path={Routes.Admin.path.relative}
              >
                <Route element={<Navigate replace to={Routes.AdminCountries.path.relative} />} index />
                <Route element={<AdminCountries />} path={Routes.AdminCountries.path.relative} />
                <Route element={<AdminInvitations />} path={Routes.AdminInvitations.path.relative} />
                <Route element={<AdminLinks />} path={Routes.AdminLinks.path.relative} />
                <Route element={<AdminCollaborators />} path={Routes.AdminCollaborators.path.relative} />
              </Route>

              {/* Tutorials */}
              <Route element={<Tutorials />} path={Routes.Tutorials.path.relative} />

              {/* Country */}
              <Route element={<Country />} path={Routes.Country.path.relative}>
                <Route element={<Navigate replace to={Routes.CountryHome.path.relative} />} index />

                <Route path={Routes.CountryHome.path.relative}>
                  <Route element={<CountryHome />} index />
                  <Route element={<CountryHome />} path="*" />
                </Route>
                <Route
                  element={
                    <Suspense>
                      <UserLazy />
                    </Suspense>
                  }
                  path={Routes.CountryUser.path.relative}
                />
                <Route
                  element={
                    <Suspense>
                      <DataDownloadLazy />
                    </Suspense>
                  }
                  path={Routes.CountryDataDownload.path.relative}
                />
                <Route
                  element={
                    <Suspense>
                      <GeoLazy />
                    </Suspense>
                  }
                  path={Routes.Geo.path.relative}
                />
                <Route
                  element={
                    <SectionWrapper>
                      <Suspense>
                        <OriginalDataPointLazy />
                      </Suspense>
                    </SectionWrapper>
                  }
                  path={Routes.OriginalDataPoint.path.relative}
                />
                <Route element={<SectionAreaSwitch />} path={Routes.Section.path.relative} />
                <Route element={<Print />} path={`${Routes.Print.path.relative}/*`} />
              </Route>

              {/* Login */}
              <Route
                element={
                  <Suspense>
                    <AuthenticationLazy />
                  </Suspense>
                }
                path={`${Routes.Login.path.relative}/*`}
              />
            </Route>
          </Route>
          <Route element={<PanEuropeanRedirect />} path={`/${RegionCode.FE}/*`} />
          <Route element={<Navigate replace to={Routes.Root.path.relative} />} path="*" />
        </Route>
        {/* Kiosk */}
        {KioskRoutes}
      </>
    )
    return createRoutesFromElements(children)
  }, [])
}
