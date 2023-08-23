import './Country.scss'
import React from 'react'
import { Outlet } from 'react-router-dom'

import classNames from 'classnames'

import { Areas, CountryIso } from 'meta/area'
import { Routes } from 'meta/routes'
import { Authorizer } from 'meta/user'

import { useCountries, useCountry } from 'client/store/area'
import { useAssessment, useCycle } from 'client/store/assessment'
import { useNavigationVisible } from 'client/store/ui/navigation'
import { useUser } from 'client/store/user'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import Navigation from 'client/components/Navigation'

import useGetUsers from './hooks/useGetUsers'
import { useInitMetaCache } from './hooks/useInitMetaCache'
import { useInitSections } from './hooks/useInitSections'
import { useReviewSummaryListener } from './hooks/useReviewSummaryListener'

const Country: React.FC = () => {
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams()

  const assessment = useAssessment()
  const cycle = useCycle()
  const user = useUser()
  const navigationVisible = useNavigationVisible()
  const countries = useCountries()
  const country = useCountry(countryIso as CountryIso) // TODO: revisit useCountry Hook
  // const isDataExportView = useIsDataExportView()
  useInitSections()
  useInitMetaCache()
  useGetUsers()
  useReviewSummaryListener()

  if (!countryIso) return null

  if (countries?.length === 0) return null

  if ((Areas.isISOCountry(countryIso) && !country) || !Authorizer.canView({ assessment, countryIso, cycle, user }))
    window.location.href = Routes.Cycle.generatePath({ assessmentName, cycleName })

  return (
    <div className={classNames('app-view', { 'navigation-on': navigationVisible })}>
      <Navigation />
      <Outlet />

      {/* <Routes> */}
      {/*  <Route */}
      {/*    path={`${ClientRoutes.Assessment.Cycle.Country.Home.Root.path.relative}/*`} */}
      {/*    element={<AssessmentHome />} */}
      {/*  /> */}

      {/*  <Route path={`${ClientRoutes.Assessment.Cycle.Country.Print.path.relative}/*`} element={<AssessmentPrint />} /> */}

      {/*  <Route */}
      {/*    path={ClientRoutes.Assessment.Cycle.Country.DataDownload.path.relative} */}
      {/*    element={<AssessmentDataDownload />} */}
      {/*  /> */}
      {/*  <Route path={ClientRoutes.Assessment.Cycle.Country.Geo.path.relative} element={<Geo />} /> */}
      {/*  <Route */}
      {/*    path={ClientRoutes.Assessment.Cycle.Country.Section.path.relative} */}
      {/*    element={<SectionWrapper>{isDataExportView ? <DataExport /> : <AssessmentSection />}</SectionWrapper>} */}
      {/*  /> */}
      {/*  <Route */}
      {/*    path={ClientRoutes.Assessment.Cycle.Country.OriginalDataPoint.Section.path.relative} */}
      {/*    element={ */}
      {/*      <SectionWrapper> */}
      {/*        <OriginalDataPoint /> */}
      {/*      </SectionWrapper> */}
      {/*    } */}
      {/*  /> */}

      {/*  <Route path={ClientRoutes.Assessment.Cycle.Country.Users.User.path.relative} element={<User />} /> */}

      {/*  <Route path="*" element={<Navigate to="home" replace />} /> */}
      {/* </Routes> */}
    </div>
  )
}

export default Country
