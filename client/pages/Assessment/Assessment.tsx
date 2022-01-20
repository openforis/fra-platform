import './assessment.scss'
import React from 'react'
import Navigation from '@client/components/Navigation'
import { Route, Switch } from 'react-router-dom'
import { useNavigationVisible } from '@client/store/ui/navigation'
import { BasePaths } from '@client/basePaths'
import OriginalDataPoint from '@client/pages/OriginalDataPoint'

const Assessment: React.FC = () => {
  const navigationVisible = useNavigationVisible()

  return (
    <div className={`app-view ${navigationVisible ? ' navigation-on' : ''}`}>
      <Navigation />

      <Switch>
        {/* <Route path={BasePaths.assessmentHome} component={AssessmentHome} /> */}
        {/* <Route path={BasePaths.assessmentDataDownload} component={AssessmentDataDownload} /> */}
        {/* <Route exact path={BasePaths.assessmentSection} component={AssessmentSection} /> */}
        {/* <Route exact path={[`${BasePaths.odp}:odpId/`, BasePaths.odp]} component={OriginalDataPoint} /> */}
        <Route path={BasePaths.OriginalDataPoint.root()} component={OriginalDataPoint} />
      </Switch>
    </div>
  )
}

export default Assessment
