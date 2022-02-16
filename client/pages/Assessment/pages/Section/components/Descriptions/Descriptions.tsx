import React from 'react'

import { Descriptions as DescriptionsType } from '@meta/assessment'
import { useTranslation } from 'react-i18next'
import NationalDataDescriptions from './NationalDataDescriptions'
import AnalysisDescriptions from './AnalysisDescriptions'
import CommentableDescription from './CommentableDescription'

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
  const [useNationalData, useAnalysisAndProcessing] = [false, false] // TODO useSelector((state) => {
  // if (printOnlyTablesView) {
  //   return [false, false]
  // }
  // return [
  //   Objects.isFunction(nationalData) ? nationalData(state) : nationalData,
  //   Objects.isFunction(analysisAndProcessing) ? analysisAndProcessing(state) : analysisAndProcessing,
  // ]
  // })

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
