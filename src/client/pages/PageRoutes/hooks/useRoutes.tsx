import React, { useMemo } from 'react'
import { createRoutesFromElements, Navigate, Route } from 'react-router-dom'

import { RegionCode } from 'meta/area'
import { Routes } from 'meta/routes/routes'

import PageLayout from 'client/components/PageLayout'
import Admin from 'client/pages/Admin'
import AdminCountries from 'client/pages/AdminCountries'
import AdminInvitations from 'client/pages/AdminInvitations'
import AdminLinks from 'client/pages/AdminLinks'
import AdminUserManagement from 'client/pages/AdminUserManagement'
import Assessment from 'client/pages/Assessment'
import Country from 'client/pages/Country'
import SectionWrapper from 'client/pages/Country/SectionWrapper'
import CountryHome from 'client/pages/CountryHome'
import Cycle from 'client/pages/Cycle'
import CycleHome from 'client/pages/CycleHome'
import DataDownload from 'client/pages/DataDownload'
import Geo from 'client/pages/Geo'
import Landing from 'client/pages/Landing'
import Login, { LoginForm, LoginInvitation, LoginInvitationLocal, LoginResetPassword } from 'client/pages/Login'
import OriginalDataPoint from 'client/pages/OriginalDataPoint'
import PanEuropeanRedirect from 'client/pages/PanEuropeanRedirect'
import Print from 'client/pages/Print'
import SectionAreaSwitch from 'client/pages/SectionAreaSwitch'
import Tutorials from 'client/pages/Tutorials'
import User from 'client/pages/User'

export const useRoutes = () => {
  return useMemo(() => {
    const children = (
      <Route element={<PageLayout />} path="/">
        <Route element={<Landing />} index />

        <Route element={<Assessment />} path={Routes.Assessment.path.relative}>
          <Route element={<Cycle />} path={Routes.Cycle.path.relative}>
            <Route element={<CycleHome />} index />

            {/* Admin */}
            <Route element={<Admin />} path={Routes.Admin.path.relative}>
              <Route element={<Navigate replace to={Routes.AdminCountries.path.relative} />} index />
              <Route element={<AdminCountries />} path={Routes.AdminCountries.path.relative} />
              <Route element={<AdminInvitations />} path={Routes.AdminInvitations.path.relative} />
              <Route element={<AdminLinks />} path={Routes.AdminLinks.path.relative} />
              <Route element={<AdminUserManagement />} path={Routes.AdminUserManagement.path.relative} />
            </Route>

            {/* Tutorials */}
            <Route element={<Tutorials />} path={Routes.Tutorials.path.relative} />

            {/* Country */}
            <Route element={<Country />} path={Routes.Country.path.relative}>
              <Route element={<Navigate replace to={Routes.CountryHome.path.relative} />} index />
              <Route element={<CountryHome />} path={`${Routes.CountryHome.path.relative}/*`} />
              <Route element={<User />} path={Routes.CountryUser.path.relative} />
              <Route element={<DataDownload />} path={Routes.CountryDataDownload.path.relative} />
              <Route element={<Geo />} path={Routes.Geo.path.relative} />
              <Route
                element={
                  <SectionWrapper>
                    <OriginalDataPoint />
                  </SectionWrapper>
                }
                path={Routes.OriginalDataPoint.path.relative}
              />
              <Route element={<SectionAreaSwitch />} path={Routes.Section.path.relative} />
              <Route element={<Print />} path={`${Routes.Print.path.relative}/*`} />
            </Route>

            {/* Login */}
            <Route element={<Login />} path={Routes.Login.path.relative}>
              <Route element={<LoginForm />} index />
              <Route element={<LoginInvitation />} path={Routes.LoginInvitation.path.relative}>
                <Route element={<LoginInvitationLocal />} path={Routes.LoginInvitationLocal.path.relative} />
              </Route>
              <Route element={<LoginResetPassword />} path={Routes.LoginResetPassword.path.relative} />
            </Route>
          </Route>
        </Route>
        <Route element={<PanEuropeanRedirect />} path={`/${RegionCode.FE}/*`} />
        <Route element={<Navigate replace to={Routes.Root.path.relative} />} path="*" />
      </Route>
    )
    return createRoutesFromElements(children)
  }, [])
}
