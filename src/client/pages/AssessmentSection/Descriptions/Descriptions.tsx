import React, { useMemo } from 'react'

import { Description, TableNames } from '@meta/assessment'

import { useAssessmentCountry, useCycle } from '@client/store/assessment'
import { useHasOriginalDataPointData } from '@client/store/ui/assessmentSection'
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
  const cycle = useCycle()

  const country = useAssessmentCountry()
  const hasOriginalDataPointData = useHasOriginalDataPointData()
  const useOriginalDataPoint = country?.props?.forestCharacteristics?.useOriginalDataPoint

  const bySections = useMemo(() => {
    const getDescriptions = (hasDescriptions: boolean) => {
      if (hasDescriptions) {
        return {
          analysisAndProcessing: {
            estimationAndForecasting: true,
            reclassification: true,
          },
          nationalData: {
            dataSources: {
              table: {
                columns: ['referenceToTataSource', 'typeOfDataSource', 'fraVariable', 'yearForDataSource', 'comments'],
              },
              text: { readOnly: cycle.name !== '2020' },
            },
            nationalClassification: true,
            originalData: true,
          },
        }
      }
      return undefined
    }
    return {
      [TableNames.extentOfForest]: getDescriptions(!hasOriginalDataPointData),
      [TableNames.forestCharacteristics]: getDescriptions(!hasOriginalDataPointData && !useOriginalDataPoint),
    }
  }, [cycle.name, hasOriginalDataPointData, useOriginalDataPoint])

  if (onlyTables) {
    return {}
  }

  // @ts-ignore
  const bySection = bySections[sectionName]

  return {
    nationalData: bySection?.nationalData ?? descriptions.nationalData,
    analysisAndProcessing: bySection?.analysisAndProcessing ?? descriptions.analysisAndProcessing,
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
