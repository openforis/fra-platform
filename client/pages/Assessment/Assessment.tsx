import './Assessment.scss'
import React, { useEffect } from 'react'
import Navigation from '@client/components/Navigation'
import { Route, Switch } from 'react-router-dom'
import { useNavigationVisible } from '@client/store/ui/navigation'
import { BasePaths } from '@client/basePaths'
import OriginalDataPoint from '@client/pages/OriginalDataPoint'
import { useCountryIso } from '@client/hooks'
import { useAppDispatch } from '@client/store'
import { AssessmentActions } from '@client/store/assessment'
import { useParams } from 'react-router'
import { AssessmentName } from '@meta/assessment'
import { Areas } from '@meta/area'
import AssessmentSection from '@client/pages/AssessmentSection'
import DataExport from '@client/pages/DataExport'
import MessageCenter from '@client/components/MessageCenter'

const Assessment: React.FC = () => {
  const navigationVisible = useNavigationVisible()
  const dispatch = useAppDispatch()
  const countryIso = useCountryIso()
  const isDataExport = countryIso && !Areas.isISOCountry(countryIso)

  const { assessmentName, cycleName } = useParams<{
    assessmentName: AssessmentName
    cycleName: string
  }>()

  useEffect(() => {
    dispatch(
      AssessmentActions.getCountry({
        countryIso,
        assessmentName,
        cycleName,
      })
    )
  }, [countryIso])

  return (
    <div className={`app-view ${navigationVisible ? ' navigation-on' : ''}`}>
      <Navigation />

      <MessageCenter />
      <Switch>
        {/* <Route path={BasePaths.assessmentHome} component={AssessmentHome} /> */}
        {/* <Route path={BasePaths.assessmentDataDownload} component={AssessmentDataDownload} /> */}
        <Route exact path={BasePaths.Assessment.section()} component={isDataExport ? DataExport : AssessmentSection} />
        {/* <Route exact path={[`${BasePaths.odp}:odpId/`, BasePaths.odp]} component={OriginalDataPoint} /> */}
        <Route path={BasePaths.Assessment.OriginalDataPoint.section()} component={OriginalDataPoint} />
      </Switch>
    </div>
  )
}

export default Assessment
