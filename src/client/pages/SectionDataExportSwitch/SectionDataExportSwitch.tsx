import React from 'react'

import { useIsDataExportView } from 'client/hooks'
import SectionWrapper from 'client/pages/Country/SectionWrapper'
import DataExport from 'client/pages/DataExport'
import Section from 'client/pages/Section'

const SectionDataExportSwitch: React.FC = () => {
  const isDataExportView = useIsDataExportView()

  const Component = isDataExportView ? DataExport : Section

  return (
    <SectionWrapper>
      <Component />
    </SectionWrapper>
  )
}

export default SectionDataExportSwitch
