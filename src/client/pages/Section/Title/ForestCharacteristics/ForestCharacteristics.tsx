import React from 'react'

import { useAssessmentCountry } from 'client/store/area/hooks/country'
import { useOriginalDataPointYears } from 'client/store/data/tableData/nodeValues/hooks/originalDataPointData'
import { useIsPrintRoute } from 'client/hooks/routes'
import OriginalDataPointsPrint from 'client/pages/Print/OriginalDataPointsPrint'
import { TitleDefault } from 'client/pages/Section/Title/Components'

import { Props } from '../props'

const ForestCharacteristics: React.FC<Props> = (props) => {
  const { subSection } = props

  const odpYears = useOriginalDataPointYears()
  const { onlyTables, print } = useIsPrintRoute()
  const hasOdps = Array.isArray(odpYears)
  const country = useAssessmentCountry()

  const { useOriginalDataPoint } = country.props.forestCharacteristics
  return (
    <>
      <TitleDefault subSection={subSection} />

      {useOriginalDataPoint && hasOdps && print && !onlyTables && (
        <OriginalDataPointsPrint sectionName={subSection.props.name} />
      )}
    </>
  )
}

export default ForestCharacteristics
