import './Assessment.scss'
import React, { useEffect } from 'react'
import { Navigate, Route, Routes, useParams } from 'react-router-dom'

import classNames from 'classnames'

import { ClientRoutes } from '@meta/app'
import { AssessmentName } from '@meta/assessment'
import { Sockets } from '@meta/socket'
import { Authorizer } from '@meta/user'

import { useAppDispatch } from '@client/store'
import { AssessmentActions, useAssessment, useCycle } from '@client/store/assessment'
import { AssessmentSectionActions } from '@client/store/pages/assessmentSection'
import { useNavigationVisible } from '@client/store/ui/navigation'
import { ReviewActions } from '@client/store/ui/review'
import { useUser } from '@client/store/user'
import { useCountryIso, useIsDataExportView } from '@client/hooks'
import Navigation from '@client/components/Navigation'
import AssessmentDataDownload from '@client/pages/AssessmentDataDownload'
import AssessmentHome from '@client/pages/AssessmentHome'
import AssessmentSection from '@client/pages/AssessmentSection'
import DataExport from '@client/pages/DataExport'
import OriginalDataPoint from '@client/pages/OriginalDataPoint'
import { SocketClient } from '@client/service/socket'

import AssessmentPrint from '../AssessmentPrint'
import SectionWrapper from './SectionWrapper'

const Assessment: React.FC = () => {
  const { assessmentName, cycleName } = useParams<{ assessmentName: AssessmentName; cycleName: string }>()
  const dispatch = useAppDispatch()
  const user = useUser()
  const navigationVisible = useNavigationVisible()
  const countryIso = useCountryIso()
  const assessment = useAssessment()
  const cycle = useCycle()
  const isDataExportView = useIsDataExportView()

  useEffect(() => {
    dispatch(AssessmentActions.getSections({ countryIso, assessmentName, cycleName }))

    return () => {
      // reset review and assessment section store
      dispatch(ReviewActions.reset())
    }
  }, [countryIso, assessmentName, cycleName, dispatch])

  // On cycle change, reset metadata, data
  useEffect(() => {
    return () => {
      dispatch(AssessmentSectionActions.resetData())
      dispatch(AssessmentSectionActions.reset())
    }
  }, [cycleName, dispatch])

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

  if (!Authorizer.canView({ countryIso, assessment, cycle, user })) window.location.href = ClientRoutes.Root.path

  return (
    <div className={classNames('app-view', { 'navigation-on': navigationVisible })}>
      <Navigation />

      <Routes>
        <Route path={`${ClientRoutes.Assessment.Home.Root.path.relative}/*`} element={<AssessmentHome />} />

        <Route path={ClientRoutes.Assessment.PrintTables.path.relative} element={<AssessmentPrint />} />
        <Route path={ClientRoutes.Assessment.Print.path.relative} element={<AssessmentPrint />} />

        <Route path={ClientRoutes.Assessment.DataDownload.path.relative} element={<AssessmentDataDownload />} />
        <Route
          path={ClientRoutes.Assessment.Section.path.relative}
          element={<SectionWrapper>{isDataExportView ? <DataExport /> : <AssessmentSection />}</SectionWrapper>}
        />
        <Route
          path={ClientRoutes.Assessment.OriginalDataPoint.Section.path.relative}
          element={
            <SectionWrapper>
              <OriginalDataPoint />
            </SectionWrapper>
          }
        />

        <Route path="*" element={<Navigate to="home" replace />} />
      </Routes>
    </div>
  )
}

export default Assessment
