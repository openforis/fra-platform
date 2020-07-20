import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import * as ObjectUtils from '@common/objectUtils'

import { useI18n, usePrintView } from '@webapp/components/hooks'

import NationalDataDescriptions from './components/nationalDataDescriptions'
import AnalysisDescriptions from './components/analysisDescriptions'
import CommentableDescription from './components/commentableDescription'

const Descriptions = (props) => {
  const { sectionName, descriptions, disabled } = props
  const { introductoryText, nationalData, analysisAndProcessing } = descriptions

  const i18n = useI18n()
  const [printView, printOnlyTablesView] = usePrintView()
  const [useNationalData, useAnalysisAndProcessing] = useSelector((state) => {
    if (printOnlyTablesView) {
      return [false, false]
    }

    return [
      ObjectUtils.isFunction(nationalData) ? nationalData(state) : nationalData,
      ObjectUtils.isFunction(analysisAndProcessing) ? analysisAndProcessing(state) : analysisAndProcessing,
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

Descriptions.propTypes = {
  sectionName: PropTypes.string.isRequired,
  descriptions: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
}

export default Descriptions
