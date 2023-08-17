import React, { useMemo } from 'react'
import { createRoutesFromElements, Navigate, Route } from 'react-router-dom'

import { Routes } from 'meta/routes/routes'

import PageLayout from 'client/components/PageLayout'
import Admin from 'client/pages/Admin'
import UserManagement from 'client/pages/Admin/UserManagement'
import Assessment from 'client/pages/Assessment'
import AssessmentPrint from 'client/pages/AssessmentPrint'
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
import SectionDataExportSwitch from 'client/pages/SectionDataExportSwitch'
import Tutorials from 'client/pages/Tutorials'
import User from 'client/pages/User'

export const useRoutes = () => {
  return useMemo(() => {
    const children = (
      <Route element={<PageLayout />} path="/">
        <Route index element={<Landing />} />
        <Route path={Routes.Assessment.path} element={<Assessment />}>
          <Route path={Routes.Cycle.path} element={<Cycle />}>
            <Route index element={<CycleHome />} />

            <Route path={Routes.Admin.path} element={<Admin />}>
              <Route index element={<Navigate to={Routes.AdminUserManagement.path} replace />} />
              <Route path={Routes.AdminUserManagement.path} element={<UserManagement />} />
            </Route>

            {/* Tutorials */}
            <Route path={Routes.Tutorials.path} element={<Tutorials />} />

            {/*      Implement:      User            */}
            <Route path={Routes.Country.path} element={<Country />}>
              <Route index element={<Navigate to={Routes.CountryHome.path} replace />} />
              <Route path={`${Routes.CountryHome.path}/*`} element={<CountryHome />} />
              <Route path={Routes.CountryUser.path} element={<User />} />
              <Route path={Routes.CountryDataDownload.path} element={<DataDownload />} />
              <Route path={Routes.Geo.path} element={<Geo />} />

              <Route
                path={Routes.OriginalDataPoint.path}
                element={
                  <SectionWrapper>
                    <OriginalDataPoint />
                  </SectionWrapper>
                }
              />
              <Route path={Routes.Section.path} element={<SectionDataExportSwitch />} />
              <Route path={`${Routes.Print.path}/*`} element={<AssessmentPrint />} />

              {/* user route */}
              {/* <Route path={ClientRoutes.Assessment.Cycle.Country.Users.User.path.relative} element={<User />} /> */}
              {/*
                Implement: User
                  */}
            </Route>

            {/* Login */}
            <Route path={Routes.Login.path} element={<Login />}>
              <Route index element={<LoginForm />} />
              <Route path={Routes.LoginInvitation.path} element={<LoginInvitation />} />
              <Route path={Routes.LoginResetPassword.path} element={<LoginResetPassword />} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<Navigate to={Routes.Root.path} replace />} />
      </Route>
    )
    return createRoutesFromElements(children)
  }, [])
}
