import React from 'react'

import { AssessmentNames } from 'meta/assessment/assessment'
import { CycleNames } from 'meta/assessment/cycle/names'

import { useIsDataExportView } from 'client/hooks/dataExport'
import { useCycleRouteParams } from 'client/hooks/routeParams'
import SectionWrapper from 'client/pages/Country/SectionWrapper'
import Section from 'client/pages/Section'

import { useGetTableSections } from './hooks/useGetTableSections'
import { DataExportView, ExplorerView } from './LazyComponents'

const SectionAreaSwitch: React.FC = () => {
  useGetTableSections()
  const isDataExportView = useIsDataExportView()

  const { assessmentName, cycleName } = useCycleRouteParams()
  const isFra2025 = assessmentName === AssessmentNames.fra && CycleNames._2025
  const isFraLatest = assessmentName === AssessmentNames.fra && cycleName === CycleNames.latest
  const DataComponent = isFra2025 || isFraLatest ? ExplorerView : DataExportView
  const Component = isDataExportView ? DataComponent : Section

  return (
    <SectionWrapper>
      <Component />
    </SectionWrapper>
  )
}

export default SectionAreaSwitch
