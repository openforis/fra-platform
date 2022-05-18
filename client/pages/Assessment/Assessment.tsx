import './Assessment.scss'
import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { Route, Switch } from 'react-router-dom'

import { Areas } from '@meta/area'
import { AssessmentName } from '@meta/assessment'

import { useAppDispatch } from '@client/store'
import { useAssessment } from '@client/store/assessment'
import { AssessmentSectionActions } from '@client/store/pages/assessmentSection'
import { useNavigationVisible } from '@client/store/ui/navigation'
import { ReviewActions } from '@client/store/ui/review'
import { useUser } from '@client/store/user'
import { useCountryIso, useOnUpdate } from '@client/hooks'
import { BasePaths } from '@client/basePaths'
import MessageCenter from '@client/components/MessageCenter'
import Navigation from '@client/components/Navigation'
import AssessmentSection from '@client/pages/AssessmentSection'
import DataExport from '@client/pages/DataExport'
import OriginalDataPoint from '@client/pages/OriginalDataPoint'

const SectionWrapper: React.FC = (props) => {
  const { children } = props

  const dispatch = useAppDispatch()
  const countryIso = useCountryIso()
  const user = useUser()
  const { assessmentName, cycleName, section } = useParams<{
    assessmentName: AssessmentName
    cycleName: string
    section: string
  }>()

  // fetch table sections metadata
  useEffect(() => {
    dispatch(
      AssessmentSectionActions.getTableSections({
        assessmentName,
        cycleName,
        section,
        countryIso,
      })
    )
  }, [countryIso, assessmentName, cycleName, section])

  // fetch section review status
  useEffect(() => {
    if (user) {
      dispatch(ReviewActions.getReviewStatus({ countryIso, assessmentName, cycleName, section }))
    }
  }, [countryIso, assessmentName, cycleName, section, user])

  // fetch section summary
  useEffect(() => {
    if (user) {
      dispatch(ReviewActions.getReviewSummary({ countryIso, assessmentName, cycleName }))
    }
  }, [countryIso, assessmentName, cycleName, user])

  // reset store
  useOnUpdate(() => {
    return () => {
      dispatch(AssessmentSectionActions.reset())
      dispatch(ReviewActions.reset())
    }
  }, [countryIso, assessmentName, cycleName])

  return <>{React.Children.toArray(children)}</>
}

const Assessment: React.FC = () => {
  const navigationVisible = useNavigationVisible()
  const countryIso = useCountryIso()
  const assessment = useAssessment()
  const isDataExport = countryIso && !Areas.isISOCountry(countryIso)

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
