import './Assessment.scss'
import React, { useEffect } from 'react'
import { Navigate, Route, Routes, useParams } from 'react-router-dom'

import { Areas } from '@meta/area'
import { AssessmentName } from '@meta/assessment'
import { Sockets } from '@meta/socket/sockets'

import { useAppDispatch } from '@client/store'
import { useAssessment } from '@client/store/assessment'
import { AssessmentSectionActions } from '@client/store/pages/assessmentSection'
import { useNavigationVisible } from '@client/store/ui/navigation'
import { ReviewActions } from '@client/store/ui/review'
import { useUser } from '@client/store/user'
import { useCountryIso, useOnUpdate } from '@client/hooks'
import { ClientRoutes } from '@client/clientRoutes'
import Navigation from '@client/components/Navigation'
import AssessmentDataDownload from '@client/pages/AssessmentDataDownload'
import AssessmentHome from '@client/pages/AssessmentHome'
import AssessmentSection from '@client/pages/AssessmentSection'
import DataExport from '@client/pages/DataExport'
import OriginalDataPoint from '@client/pages/OriginalDataPoint'
import { SocketClient } from '@client/service/socket'

import SectionWrapper from './SectionWrapper'

const Assessment: React.FC = () => {
  const { assessmentName, cycleName } = useParams<{ assessmentName: AssessmentName; cycleName: string }>()
  const dispatch = useAppDispatch()
  const user = useUser()
  const navigationVisible = useNavigationVisible()
  const countryIso = useCountryIso()
  const assessment = useAssessment()
  const isDataExport = countryIso && !Areas.isISOCountry(countryIso)

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
  }, [countryIso, assessmentName, cycleName, user])

  // reset review and assessment sectionstore
  useOnUpdate(() => {
    return () => {
      dispatch(AssessmentSectionActions.reset())
      dispatch(ReviewActions.reset())
    }
  }, [countryIso, assessmentName, cycleName])

  if (!assessment) return null

  return (
    <div className={`app-view ${navigationVisible ? ' navigation-on' : ''}`}>
      <Navigation />

      <Routes>
        <Route path={ClientRoutes.Assessment.home.path} element={<AssessmentHome />} />
        <Route path={ClientRoutes.Assessment.dataDownload.path} element={<AssessmentDataDownload />} />
        {/* <Route exact path={[`${BasePaths.odp}:odpId/`, BasePaths.odp]} component={OriginalDataPoint} /> */}
        <Route element={<SectionWrapper />}>
          <Route
            path={ClientRoutes.Assessment.section.path}
            element={isDataExport ? <DataExport /> : <AssessmentSection />}
          />
          <Route path={ClientRoutes.Assessment.OriginalDataPoint.section.path} element={<OriginalDataPoint />} />
        </Route>
        <Route
          path={ClientRoutes.Assessment.root.path}
          element={
            <Navigate
              to={ClientRoutes.Assessment.home.generatePath({ countryIso, assessmentName, cycleName, route: null })}
              replace
            />
          }
        />
      </Routes>
    </div>
  )
}

export default Assessment
