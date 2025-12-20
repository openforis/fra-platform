import React from 'react'

import { AssessmentName, AssessmentNames } from 'meta/assessment/assessment'

import AssessmentSwitch from 'client/components/AssessmentSwitch'
import PanEuropeanOverview from 'client/pages/CountryHome/PanEuropeanOverview'

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
  [AssessmentNames.panEuropean]: PanEuropeanOverview,
}

const CycleHome: React.FC = () => {
  useCycleRedirect()

  return <AssessmentSwitch components={Components} />
}

export default CycleHome
