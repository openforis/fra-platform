import React from 'react'

import { AssessmentName, AssessmentNames } from 'meta/assessment/assessment'

import AssessmentSwitch from 'client/components/AssessmentSwitch'
import Overview from 'client/pages/CountryHome/PanEuropeanHome/Overview'

import { useCycleRedirect } from './hooks/useCycleRedirect'
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

const CycleHome: React.FC = () => {
  useCycleRedirect()

  return <AssessmentSwitch components={Components} />
}

export default CycleHome
