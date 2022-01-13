import React from 'react'
import Navigation from '@client/components/Navigation'
import { Switch } from 'react-router-dom'

const Assessment: React.FC = () => {
  // todo
  const navigationVisible = true

  return (
    <div className={`app-view ${navigationVisible ? ' navigation-on' : ''}`}>
      <Navigation />

      <Switch>
        {/* <Route path={BasePaths.assessmentHome} component={AssessmentHome} /> */}
        {/* <Route path={BasePaths.assessmentDataDownload} component={AssessmentDataDownload} /> */}
        {/* <Route exact path={BasePaths.assessmentSection} component={AssessmentSection} /> */}
        {/* <Route exact path={[`${BasePaths.odp}:odpId/`, BasePaths.odp]} component={OriginalDataPoint} /> */}
      </Switch>
    </div>
  )
}

export default Assessment
