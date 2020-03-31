import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import * as ObjectUtils from '@common/objectUtils'

import * as AppState from '@webapp/app/appState'

import useI18n from '@webapp/components/hooks/useI18n'

import NationalDataDescriptions from './components/nationalDataDescriptions'
import AnalysisDescriptions from './components/analysisDescriptions'
import CommentableDescription from './components/commentableDescription'

const Descriptions = (props) => {
  const { sectionName, descriptions, disabled } = props
  const { introductoryText, nationalData, analysisAndProcessing } = descriptions

  const i18n = useI18n()
  const [useNationalData, useAnalysisAndProcessing] = useSelector((state) => {
    if (AppState.isPrintOnlyTablesView(state)) {
      return [false, false]
    }

    return [
      ObjectUtils.isFunction(nationalData) ? nationalData(state) : nationalData,
      ObjectUtils.isFunction(analysisAndProcessing) ? analysisAndProcessing(state) : analysisAndProcessing,
    ]
  })
  const printView = useSelector(AppState.isPrintView)

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
    </>
  )
}

Descriptions.propTypes = {
  sectionName: PropTypes.string.isRequired,
  descriptions: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
}

export default Descriptions
