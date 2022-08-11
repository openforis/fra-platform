import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Descriptions as DescriptionsType, TableNames } from '@meta/assessment'

import { useAssessmentCountry } from '@client/store/assessment'
import { useHasOriginalDataPointData } from '@client/store/pages/assessmentSection'
import { useIsPrint } from '@client/hooks/useIsPath'

import AnalysisDescriptions from './AnalysisDescriptions'
import CommentableDescription from './CommentableDescription'
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
  const { descriptions, disabled, sectionName } = props

  const i18n = useTranslation()
  const { print, onlyTables } = useIsPrint()

  const { introductoryText } = descriptions
  const { analysisAndProcessing, nationalData } = useDescriptions(props)

  return (
    <>
      {nationalData && (
        <NationalDataDescriptions
          section={sectionName}
          disabled={disabled}
          showAlertEmptyContent={!print}
          showDashEmptyContent={print}
        />
      )}

      {analysisAndProcessing && (
        <AnalysisDescriptions
          section={sectionName}
          disabled={disabled}
          showAlertEmptyContent={!print}
          showDashEmptyContent={print}
        />
      )}

      {introductoryText && (
        <CommentableDescription
          section={sectionName}
          title={i18n.t('contactPersons.introductoryText')}
          name="introductoryText"
          template={i18n.t('contactPersons.introductoryTextSupport')}
          disabled={disabled}
        />
      )}

      {print && !onlyTables && (nationalData || analysisAndProcessing) && <div className="page-break" />}
    </>
  )
}

export default Descriptions
