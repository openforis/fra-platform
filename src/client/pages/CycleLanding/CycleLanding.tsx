import React from 'react'

import { AssessmentName, AssessmentNames } from 'meta/assessment'

import AssessmentSwitch from 'client/components/AssessmentSwitch'
import Overview from 'client/pages/AssessmentHome/PanEuropeanHome/Overview'

import Introduction from './Introduction'
import KeyFindings from './KeyFindings'
import Partners from './Partners'

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
