import React from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from '@core/utils'

import { Descriptions as DescriptionsType } from '@meta/assessment'

import { useAppSelector } from '@client/store'

import AnalysisDescriptions from './AnalysisDescriptions'
import CommentableDescription from './CommentableDescription'
import NationalDataDescriptions from './NationalDataDescriptions'

type Props = {
  sectionName: string
  descriptions: DescriptionsType
  disabled: boolean
}

const Descriptions: React.FC<Props> = (props: Props) => {
  const { sectionName, descriptions, disabled } = props
  const { introductoryText, nationalData, analysisAndProcessing } = descriptions
  const i18n = useTranslation()
  const [printView, printOnlyTablesView] = [false, false] // TODO: usePrintView()
  const [useNationalData, useAnalysisAndProcessing] = useAppSelector((state) => {
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
          title={i18n.t<string>('contactPersons.introductoryText')}
          name="introductoryText"
          template={i18n.t<string>('contactPersons.introductoryTextSupport')}
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
