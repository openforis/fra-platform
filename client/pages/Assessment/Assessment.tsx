import './Assessment.scss'
import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { Route, Switch } from 'react-router-dom'

import { AssessmentName } from '@meta/assessment'
import { Areas } from '@meta/area'

import { useAppDispatch } from '@client/store'
import { useNavigationVisible } from '@client/store/ui/navigation'
import { AssessmentSectionActions } from '@client/store/pages/assessmentSection'
import { useCountryIso } from '@client/hooks'
import { BasePaths } from '@client/basePaths'

import Navigation from '@client/components/Navigation'
import MessageCenter from '@client/components/MessageCenter'
import OriginalDataPoint from '@client/pages/OriginalDataPoint'
import AssessmentSection from '@client/pages/AssessmentSection'
import DataExport from '@client/pages/DataExport'

const SectionWrapper: React.FC = (props) => {
  const { children } = props

  const dispatch = useAppDispatch()
  const countryIso = useCountryIso()
  const { assessmentName, cycleName, section } = useParams<{
    assessmentName: AssessmentName
    cycleName: string
    section: string
  }>()

  useEffect(() => {
    dispatch(
      AssessmentSectionActions.getTableSections({
        assessmentName,
        cycleName,
        section,
        countryIso,
      })
    )

    return () => {
      dispatch(AssessmentSectionActions.reset())
    }
  }, [countryIso, assessmentName, cycleName, section])

  return <>{React.Children.toArray(children)}</>
}

const Assessment: React.FC = () => {
  const navigationVisible = useNavigationVisible()
  const countryIso = useCountryIso()
  const isDataExport = countryIso && !Areas.isISOCountry(countryIso)

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
