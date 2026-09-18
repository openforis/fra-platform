import React from 'react'
import { Navigate } from 'react-router'

import { AssessmentNames } from 'meta/assessment/assessment'
import { CycleNames } from 'meta/assessment/cycle/names'
import { Routes } from 'meta/routes/routes'

import { useCanViewCycleData } from 'client/store/user/hooks/auth'
import { useIsDataExportView } from 'client/hooks/dataExport'
import { useCycleRouteParams } from 'client/hooks/routeParams'
import SectionWrapper from 'client/pages/Country/SectionWrapper'
import Section from 'client/pages/Section'

import { useGetTableSections } from './hooks/useGetTableSections'
import { DataExportView, ExplorerView } from './LazyComponents'

const SectionAreaSwitch: React.FC = () => {
  useGetTableSections()
  const isDataExportView = useIsDataExportView()
  const canViewCycleData = useCanViewCycleData()

  const { assessmentName, cycleName } = useCycleRouteParams()
  const isFra2025 = assessmentName === AssessmentNames.fra && CycleNames._2025
  const isFraLatest = assessmentName === AssessmentNames.fra && cycleName === CycleNames.latest
  const DataComponent = isFra2025 || isFraLatest ? ExplorerView : DataExportView
  const Component = isDataExportView ? DataComponent : Section

  if (isDataExportView && !canViewCycleData) {
    return <Navigate replace to={Routes.Root.path.absolute} />
  }

  return (
    <SectionWrapper>
      <Component />
    </SectionWrapper>
  )
}

export default SectionAreaSwitch
