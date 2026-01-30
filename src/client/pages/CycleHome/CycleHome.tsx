import React from 'react'

import { AssessmentName, AssessmentNames } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'

import { useCycleRouteParams } from 'client/hooks/routeParams'
import AssessmentSwitch from 'client/components/AssessmentSwitch'
import PanEuropeanOverview from 'client/pages/CountryHome/PanEuropeanOverview'
import KeyFindings from 'client/pages/CycleHome/KeyFindings'

import { useCycleRedirect } from './hooks/useCycleRedirect'
import Introduction from './Introduction'
import Partners from './Partners'
import ReportAndStory from './ReportAndStory'

const HeroComponents: Record<CycleName, React.FC> = {
  '2020': KeyFindings,
  '2025': ReportAndStory,
  latest: ReportAndStory,
}

const Components: { [key: AssessmentName]: React.FC } = {
  [AssessmentNames.fra]: () => {
    const { cycleName } = useCycleRouteParams()

    const HeroComponent = HeroComponents[cycleName]

    return (
      <>
        <Introduction />
        <HeroComponent />
        <Partners />
      </>
    )
  },
  [AssessmentNames.panEuropean]: PanEuropeanOverview,
}

const CycleHome: React.FC = () => {
  useCycleRedirect()

  return <AssessmentSwitch components={Components} />
}

export default CycleHome
