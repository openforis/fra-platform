import React from 'react'

import { Description } from '@meta/assessment'

import { useAssessmentCountry } from '@client/store/assessment'
import { useHasOriginalDataPointData } from '@client/store/data'
import { useIsPrint } from '@client/hooks/useIsPath'

import AnalysisDescriptions from './AnalysisDescriptions'
import NationalDataDescriptions from './NationalDataDescriptions'

type Props = {
  descriptions: Description
  disabled: boolean
  sectionName: string
}

export const useDescriptions = (props: Props): Description => {
  const { descriptions, sectionName } = props
  const { onlyTables } = useIsPrint()

  const country = useAssessmentCountry()
  const hasOriginalDataPointData = useHasOriginalDataPointData()
  const useOriginalDataPoint = country?.props?.forestCharacteristics?.useOriginalDataPoint

  if (onlyTables) {
    return {}
  }

  // Only show comments if section has ODP data
  const onlyComments =
    (sectionName === 'extentOfForest' && hasOriginalDataPointData) ||
    (sectionName === 'forestCharacteristics' && useOriginalDataPoint)

  if (onlyComments) {
    return {
      comments: true,
    }
  }

  return {
    nationalData: descriptions.nationalData,
    analysisAndProcessing: descriptions.analysisAndProcessing,
  }
}

const Descriptions: React.FC<Props> = (props: Props) => {
  const { disabled, sectionName, descriptions } = props

  const { print, onlyTables } = useIsPrint()

  const { analysisAndProcessing, nationalData } = useDescriptions({
    descriptions,
    sectionName,
    disabled,
  })
  return (
    <>
      {nationalData && (
        <NationalDataDescriptions
          nationalData={nationalData}
          sectionName={sectionName}
          disabled={disabled}
          showAlertEmptyContent={!print}
          showDashEmptyContent={print}
        />
      )}

      {analysisAndProcessing && (
        <AnalysisDescriptions
          analysisAndProcessing={analysisAndProcessing}
          sectionName={sectionName}
          disabled={disabled}
          showAlertEmptyContent={!print}
          showDashEmptyContent={print}
        />
      )}

      {print && !onlyTables && (nationalData || analysisAndProcessing) && <div className="page-break" />}
    </>
  )
}

export default Descriptions
