import './Assessment.scss'
import React, { useEffect } from 'react'
import { Route, Switch, useParams } from 'react-router-dom'

import { Areas } from '@meta/area'
import { AssessmentName } from '@meta/assessment'
import { Sockets } from '@meta/socket/sockets'

import { useAppDispatch } from '@client/store'
import { useAssessment } from '@client/store/assessment'
import { useNavigationVisible } from '@client/store/ui/navigation'
import { ReviewActions } from '@client/store/ui/review'
import { useCountryIso } from '@client/hooks'
import { BasePaths } from '@client/basePaths'
import MessageCenter from '@client/components/MessageCenter'
import Navigation from '@client/components/Navigation'
import AssessmentSection from '@client/pages/AssessmentSection'
import DataExport from '@client/pages/DataExport'
import OriginalDataPoint from '@client/pages/OriginalDataPoint'
import { SocketClient } from '@client/service/socket'

import SectionWrapper from './SectionWrapper'

const Assessment: React.FC = () => {
  const navigationVisible = useNavigationVisible()
  const dispatch = useAppDispatch()
  const countryIso = useCountryIso()
  const assessment = useAssessment()

  const { assessmentName, cycleName } = useParams<{
    assessmentName: AssessmentName
    cycleName: string
  }>()

  const updateReviewSummaryEvent = Sockets.updateReviewSummaryEvent({ countryIso, assessmentName, cycleName })

  const isDataExport = countryIso && !Areas.isISOCountry(countryIso)

  useEffect(() => {
    const updateReviewSummaryEventHandler = () => {
      dispatch(ReviewActions.getReviewSummary({ countryIso, assessmentName, cycleName }))
    }

    SocketClient.open().on(updateReviewSummaryEvent, updateReviewSummaryEventHandler)

    return () => {
      SocketClient.off(updateReviewSummaryEvent, updateReviewSummaryEventHandler)
    }
  }, [])

  if (!assessment) return null

  return (
    <div className={`app-view ${navigationVisible ? ' navigation-on' : ''}`}>
      <Navigation />

      <MessageCenter />
      <Switch>
        {/* <Route path={BasePaths.assessmentHome} component={AssessmentHome} /> */}
        {/* <Route path={BasePaths.assessmentDataDownload} component={AssessmentDataDownload} /> */}
        <Route
          exact
          path={BasePaths.Assessment.section()}
          render={() => <SectionWrapper>{isDataExport ? <DataExport /> : <AssessmentSection />}</SectionWrapper>}
        />
        {/* <Route exact path={[`${BasePaths.odp}:odpId/`, BasePaths.odp]} component={OriginalDataPoint} /> */}
        <Route
          path={BasePaths.Assessment.OriginalDataPoint.section()}
          render={() => (
            <SectionWrapper>
              <OriginalDataPoint />
            </SectionWrapper>
          )}
        />
      </Switch>
    </div>
  )
}

export default Assessment
