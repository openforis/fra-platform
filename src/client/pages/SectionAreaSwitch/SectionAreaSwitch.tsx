import React from 'react'

import { useGetTableSections } from 'client/store/metadata'
import { useIsDataExportView } from 'client/hooks'
import SectionWrapper from 'client/pages/Country/SectionWrapper'
import DataExport from 'client/pages/DataExport'
import Section from 'client/pages/Section'

const SectionAreaSwitch: React.FC = () => {
  useGetTableSections()
  const isDataExportView = useIsDataExportView()

  const Component = isDataExportView ? DataExport : Section

  return (
    <SectionWrapper>
      <Component />
    </SectionWrapper>
  )
}

export default SectionAreaSwitch
