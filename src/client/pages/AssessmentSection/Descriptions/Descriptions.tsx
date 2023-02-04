import React, { useMemo } from 'react'

import { Descriptions as DescriptionsType, TableNames } from '@meta/assessment'

import { useAssessmentCountry } from '@client/store/assessment'
import { useHasOriginalDataPointData } from '@client/store/ui/assessmentSection'
import { useIsPrint } from '@client/hooks/useIsPath'

import AnalysisDescriptions from './AnalysisDescriptions'
import NationalDataDescriptions from './NationalDataDescriptions'

type Props = {
  descriptions: DescriptionsType
  disabled: boolean
  sectionName: string
}

const useDescriptions = (props: Props): { nationalData: boolean; analysisAndProcessing: boolean } => {
  const { descriptions, sectionName } = props
  const { onlyTables } = useIsPrint()

  const country = useAssessmentCountry()
  const hasOriginalDataPointData = useHasOriginalDataPointData()
  const useOriginalDataPoint = country?.props?.forestCharacteristics?.useOriginalDataPoint

  const bySections = useMemo<Record<string, boolean>>(
    () => ({
      [TableNames.extentOfForest]: !hasOriginalDataPointData,
      [TableNames.forestCharacteristics]: !hasOriginalDataPointData && useOriginalDataPoint,
    }),
    [useOriginalDataPoint, hasOriginalDataPointData]
  )

  if (onlyTables) {
    return {
      nationalData: false,
      analysisAndProcessing: false,
    }
  }

  const bySection = bySections[sectionName]

  return {
    nationalData: bySection ?? descriptions.nationalData,
    analysisAndProcessing: bySection ?? descriptions.analysisAndProcessing,
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
          sectionName={sectionName}
          disabled={disabled}
          showAlertEmptyContent={!print}
          showDashEmptyContent={print}
        />
      )}

      {analysisAndProcessing && (
        <AnalysisDescriptions
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
