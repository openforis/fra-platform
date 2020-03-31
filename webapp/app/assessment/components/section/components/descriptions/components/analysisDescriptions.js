import React from 'react'
import PropTypes from 'prop-types'

import useI18n from '@webapp/components/hooks/useI18n'

import CommentableDescription from './commentableDescription'

const AnalysisDescriptions = (props) => {
  const { section, disabled, showAlertEmptyContent, showDashEmptyContent } = props
  const i18n = useI18n()

  return (
    <div className="fra-description__container">
      <h2 className="headline fra-description__group-header">{i18n.t('description.analysisAndProcessing')}</h2>
      <CommentableDescription
        title={i18n.t('description.estimationAndForecasting')}
        disabled={disabled}
        section={section}
        name="estimationAndForecasting"
        showAlertEmptyContent={showAlertEmptyContent}
        showDashEmptyContent={showDashEmptyContent}
      />
      <CommentableDescription
        title={i18n.t('description.reclassification')}
        disabled={disabled}
        section={section}
        name="reclassification"
        showAlertEmptyContent={showAlertEmptyContent}
        showDashEmptyContent={showDashEmptyContent}
      />
    </div>
  )
}

AnalysisDescriptions.propTypes = {
  section: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  showAlertEmptyContent: PropTypes.bool.isRequired,
  showDashEmptyContent: PropTypes.bool.isRequired,
}

export default AnalysisDescriptions
