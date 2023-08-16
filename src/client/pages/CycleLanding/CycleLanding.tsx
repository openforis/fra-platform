import React from 'react'

import { AssessmentName, AssessmentNames } from 'meta/assessment'

import AssessmentSwitch from 'client/components/AssessmentSwitch'
import Partners from 'client/components/Partners'
import Overview from 'client/pages/AssessmentHome/PanEuropeanHome/Overview'
import Introduction from 'client/pages/Cycle/Introduction'
import KeyFindings from 'client/pages/Cycle/KeyFindings'

const Components: { [key: AssessmentName]: React.FC } = {
  [AssessmentNames.fra]: () => (
    <>
      <Introduction />
      <KeyFindings />
      <Partners />
    </>
  ),
  [AssessmentNames.panEuropean]: Overview,
}

const CycleLanding = () => {
  return <AssessmentSwitch components={Components} />
}

export default CycleLanding
