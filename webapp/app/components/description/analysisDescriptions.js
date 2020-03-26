import React from 'react'
import PropTypes from 'prop-types'

import { isPrintingMode, isPrintingOnlyTables } from '@webapp/app/assessment/components/print/printAssessment'

import CommentableDescription from '@webapp/app/components/description/commentableDescription'
import useI18n from '@webapp/components/hooks/useI18n'

const AnalysisDescriptions = ({ section }) => {
  const i18n = useI18n()

  return (
    !isPrintingOnlyTables() && (
      <div className="fra-description__container">
        <h2 className="headline fra-description__group-header">{i18n.t('description.analysisAndProcessing')}</h2>
        <CommentableDescription
          title={i18n.t('description.estimationAndForecasting')}
          section={section}
          name="estimationAndForecasting"
          showAlertEmptyContent={!isPrintingMode()}
          showDashEmptyContent={isPrintingMode()}
        />
        <CommentableDescription
          title={i18n.t('description.reclassification')}
          section={section}
          name="reclassification"
          showAlertEmptyContent={!isPrintingMode()}
          showDashEmptyContent={isPrintingMode()}
        />
      </div>
    )
  )
}

AnalysisDescriptions.propTypes = {
  section: PropTypes.string.isRequired,
}

export default AnalysisDescriptions
