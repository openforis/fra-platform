import React from 'react'
import { useSelector } from 'react-redux'

import { Objects } from '@core/utils'
import { DescriptionsSpec } from '@webapp/sectionSpec'
import { useI18n, usePrintView } from '@webapp/components/hooks'

import NationalDataDescriptions from './NationalDataDescriptions'
import AnalysisDescriptions from './AnalysisDescriptions'
import CommentableDescription from './CommentableDescription'

type Props = {
  sectionName: string
  descriptions: DescriptionsSpec
  disabled: boolean
}

const Descriptions: React.FC<Props> = (props: Props) => {
  const { sectionName, descriptions, disabled } = props
  const { introductoryText, nationalData, analysisAndProcessing } = descriptions

  const i18n = useI18n()
  const [printView, printOnlyTablesView] = usePrintView()
  const [useNationalData, useAnalysisAndProcessing] = useSelector((state) => {
    if (printOnlyTablesView) {
      return [false, false]
    }
    return [
      Objects.isFunction(nationalData) ? nationalData(state) : nationalData,
      Objects.isFunction(analysisAndProcessing) ? analysisAndProcessing(state) : analysisAndProcessing,
    ]
  })

  return (
    <>
      {useNationalData && (
        <NationalDataDescriptions
          section={sectionName}
          disabled={disabled}
          showAlertEmptyContent={!printView}
          showDashEmptyContent={printView}
        />
      )}

      {useAnalysisAndProcessing && (
        <AnalysisDescriptions
          section={sectionName}
          disabled={disabled}
          showAlertEmptyContent={!printView}
          showDashEmptyContent={printView}
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

      {printView && !printOnlyTablesView && (useNationalData || useAnalysisAndProcessing) && (
        <div className="page-break" />
      )}
    </>
  )
}

export default Descriptions
