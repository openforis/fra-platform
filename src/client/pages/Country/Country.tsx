import './Country.scss'
import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import classNames from 'classnames'

import { ClientRoutes } from 'meta/app'
import { Areas } from 'meta/area'
import { Sockets } from 'meta/socket'
import { Authorizer } from 'meta/user'

import { useAppDispatch } from 'client/store'
import { useCountries, useCountry } from 'client/store/area'
import { useCycle } from 'client/store/assessment'
import { useNavigationVisible } from 'client/store/ui/navigation'
import { ReviewActions } from 'client/store/ui/review'
import { useUser } from 'client/store/user'
import { useIsDataExportView } from 'client/hooks'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import Navigation from 'client/components/Navigation'
import AssessmentDataDownload from 'client/pages/AssessmentDataDownload'
import AssessmentHome from 'client/pages/AssessmentHome'
import AssessmentPrint from 'client/pages/AssessmentPrint'
import AssessmentSection from 'client/pages/AssessmentSection'
import useGetUsers from 'client/pages/Country/hooks/useGetUsers'
import DataExport from 'client/pages/DataExport'
import Geo from 'client/pages/Geo'
import OriginalDataPoint from 'client/pages/OriginalDataPoint'
import User from 'client/pages/User'
import { SocketClient } from 'client/service/socket'

import SectionWrapper from './SectionWrapper'

const Country: React.FC = () => {
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams()
  const dispatch = useAppDispatch()
  const user = useUser()
  const navigationVisible = useNavigationVisible()
  const cycle = useCycle()
  const countries = useCountries()
  const country = useCountry(countryIso)
  const isDataExportView = useIsDataExportView()
  useGetUsers()

  useEffect(() => {
    return () => {
      // reset review and assessment section store
      dispatch(ReviewActions.reset())
    }
  }, [countryIso, assessmentName, cycleName, dispatch])

  useEffect(() => {
    const requestReviewSummaryEvent = Sockets.getRequestReviewSummaryEvent({ countryIso, assessmentName, cycleName })

    const updateReviewSummaryEventHandler = () => {
      dispatch(ReviewActions.getReviewSummary({ countryIso, assessmentName, cycleName }))
    }

    if (user) {
      // fetch review summary
      dispatch(ReviewActions.getReviewSummary({ countryIso, assessmentName, cycleName }))
      SocketClient.on(requestReviewSummaryEvent, updateReviewSummaryEventHandler)
    } else {
      // reset review summary
      dispatch(ReviewActions.reset())
    }

    return () => {
      if (user) {
        SocketClient.off(requestReviewSummaryEvent, updateReviewSummaryEventHandler)
      }
    }
  }, [countryIso, assessmentName, cycleName, user, dispatch])

  if (!countryIso) return null

  if (countries?.length === 0) return null

  if ((Areas.isISOCountry(countryIso) && !country) || !Authorizer.canView({ countryIso, cycle, user }))
    window.location.href = ClientRoutes.Assessment.Cycle.Landing.getLink({ assessmentName, cycleName })

  return (
    <div className={classNames('app-view', { 'navigation-on': navigationVisible })}>
      <Navigation />

      <Routes>
        <Route
          path={`${ClientRoutes.Assessment.Cycle.Country.Home.Root.path.relative}/*`}
          element={<AssessmentHome />}
        />

        <Route path={`${ClientRoutes.Assessment.Cycle.Country.Print.path.relative}/*`} element={<AssessmentPrint />} />

        <Route
          path={ClientRoutes.Assessment.Cycle.Country.DataDownload.path.relative}
          element={<AssessmentDataDownload />}
        />
        <Route path={ClientRoutes.Assessment.Cycle.Country.Geo.path.relative} element={<Geo />} />
        <Route
          path={ClientRoutes.Assessment.Cycle.Country.Section.path.relative}
          element={<SectionWrapper>{isDataExportView ? <DataExport /> : <AssessmentSection />}</SectionWrapper>}
        />
        <Route
          path={ClientRoutes.Assessment.Cycle.Country.OriginalDataPoint.Section.path.relative}
          element={
            <SectionWrapper>
              <OriginalDataPoint />
            </SectionWrapper>
          }
        />

        <Route path={ClientRoutes.Assessment.Cycle.Country.Users.User.path.relative} element={<User />} />

        <Route path="*" element={<Navigate to="home" replace />} />
      </Routes>
    </div>
  )
}

export default Country
