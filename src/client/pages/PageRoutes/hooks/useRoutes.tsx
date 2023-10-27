import React, { useMemo } from 'react'
import { createRoutesFromElements, Navigate, Route } from 'react-router-dom'

import { Routes } from 'meta/routes/routes'

import PageLayout from 'client/components/PageLayout'
import Admin from 'client/pages/Admin'
import UserManagement from 'client/pages/Admin/UserManagement'
import AdminCountries from 'client/pages/AdminCountries'
import AdminInvitations from 'client/pages/AdminInvitations'
import Assessment from 'client/pages/Assessment'
import Country from 'client/pages/Country'
import SectionWrapper from 'client/pages/Country/SectionWrapper'
import CountryHome from 'client/pages/CountryHome'
import Cycle from 'client/pages/Cycle'
import CycleHome from 'client/pages/CycleHome'
import DataDownload from 'client/pages/DataDownload'
import Geo from 'client/pages/Geo'
import Landing from 'client/pages/Landing'
import Login, { LoginForm, LoginInvitation, LoginResetPassword } from 'client/pages/Login'
import OriginalDataPoint from 'client/pages/OriginalDataPoint'
import Print from 'client/pages/Print'
import SectionAreaSwitch from 'client/pages/SectionAreaSwitch'
import Tutorials from 'client/pages/Tutorials'
import User from 'client/pages/User'

export const useRoutes = () => {
  return useMemo(() => {
    const children = (
      <Route element={<PageLayout />} path="/">
        <Route index element={<Landing />} />

        <Route path={Routes.Assessment.path.relative} element={<Assessment />}>
          <Route path={Routes.Cycle.path.relative} element={<Cycle />}>
            <Route index element={<CycleHome />} />

            {/* Admin */}
            <Route path={Routes.Admin.path.relative} element={<Admin />}>
              <Route index element={<Navigate to={Routes.AdminCountries.path.relative} replace />} />
              <Route path={Routes.AdminInvitations.path.relative} element={<AdminInvitations />} />
              <Route path={Routes.AdminCountries.path.relative} element={<AdminCountries />} />
              <Route path={Routes.AdminUserManagement.path.relative} element={<UserManagement />} />
            </Route>

            {/* Tutorials */}
            <Route path={Routes.Tutorials.path.relative} element={<Tutorials />} />

            {/* Country */}
            <Route path={Routes.Country.path.relative} element={<Country />}>
              <Route index element={<Navigate to={Routes.CountryHome.path.relative} replace />} />
              <Route path={`${Routes.CountryHome.path.relative}/*`} element={<CountryHome />} />
              <Route path={Routes.CountryUser.path.relative} element={<User />} />
              <Route path={Routes.CountryDataDownload.path.relative} element={<DataDownload />} />
              <Route path={Routes.Geo.path.relative} element={<Geo />} />
              <Route
                path={Routes.OriginalDataPoint.path.relative}
                element={
                  <SectionWrapper>
                    <OriginalDataPoint />
                  </SectionWrapper>
                }
              />
              <Route path={Routes.Section.path.relative} element={<SectionAreaSwitch />} />
              <Route path={`${Routes.Print.path.relative}/*`} element={<Print />} />
            </Route>

            {/* Login */}
            <Route path={Routes.Login.path.relative} element={<Login />}>
              <Route index element={<LoginForm />} />
              <Route path={Routes.LoginInvitation.path.relative} element={<LoginInvitation />} />
              <Route path={Routes.LoginResetPassword.path.relative} element={<LoginResetPassword />} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<Navigate to={Routes.Root.path.relative} replace />} />
      </Route>
    )
    return createRoutesFromElements(children)
  }, [])
}
