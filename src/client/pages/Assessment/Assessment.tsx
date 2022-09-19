import './Assessment.scss'
import React, { useEffect } from 'react'
import { Navigate, Route, Routes, useParams } from 'react-router-dom'

import { Areas } from '@meta/area'
import { AssessmentName } from '@meta/assessment'
import { Sockets } from '@meta/socket'

import { useAppDispatch } from '@client/store'
import { AssessmentActions, useAssessment } from '@client/store/assessment'
import { AssessmentSectionActions } from '@client/store/pages/assessmentSection'
import { useNavigationVisible } from '@client/store/ui/navigation'
import { ReviewActions } from '@client/store/ui/review'
import { useUser } from '@client/store/user'
import { useCountryIso } from '@client/hooks'
import { ClientRoutes } from '@client/clientRoutes'
import CountrySelect from '@client/components/CountrySelect'
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
    dispatch(AssessmentActions.getSections({ countryIso, assessmentName, cycleName }))

    return () => {
      // reset review and assessment section store
      dispatch(AssessmentSectionActions.reset())
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

  if (!assessment) return null

  return (
    <>
      <CountrySelect />
      <div className={`app-view ${navigationVisible ? ' navigation-on' : ''}`}>
        <Navigation />
        <Routes>
          <Route path={`${ClientRoutes.Assessment.Home.Root.path.relative}/*`} element={<AssessmentHome />} />
          <Route path={ClientRoutes.Assessment.DataDownload.path.relative} element={<AssessmentDataDownload />} />
          <Route
            path={ClientRoutes.Assessment.Section.path.relative}
            element={<SectionWrapper>{isDataExport ? <DataExport /> : <AssessmentSection />}</SectionWrapper>}
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
    </>
  )
}

export default Assessment
