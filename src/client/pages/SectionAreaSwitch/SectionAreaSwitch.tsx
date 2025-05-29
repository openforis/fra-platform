import React from 'react'

import { AssessmentNames } from 'meta/assessment/assessment'

import { useIsDataExportView } from 'client/hooks'
import { useCycleRouteParams } from 'client/hooks/useRouteParams'
import SectionWrapper from 'client/pages/Country/SectionWrapper'
import DataExport from 'client/pages/DataExport'
import Explorer from 'client/pages/Explorer'
import Section from 'client/pages/Section'

import { useGetTableSections } from './hooks/useGetTableSections'

const SectionAreaSwitch: React.FC = () => {
  useGetTableSections()
  const isDataExportView = useIsDataExportView()

  const { assessmentName, cycleName } = useCycleRouteParams()
  const isFra2025 = assessmentName === AssessmentNames.fra && cycleName === '2025'

  const DataComponent = isFra2025 ? Explorer : DataExport
  const Component = isDataExportView ? DataComponent : Section

  return (
    <SectionWrapper>
      <Component />
    </SectionWrapper>
  )
}

export default SectionAreaSwitch
