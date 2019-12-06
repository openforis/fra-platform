import React from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'

import CommentableDescription from '../description/commentableDescription'
import { isPrintingMode, isPrintingOnlyTables } from '../printAssessment/printAssessment'

const AnalysisDescriptions = props => {
  const { countryIso } = useParams()

  return !isPrintingOnlyTables() &&
    <div className="fra-description__container">
      <h2 className="headline fra-description__group-header">{props.i18n.t('description.analysisAndProcessing')}</h2>
      <CommentableDescription
        title={props.i18n.t('description.estimationAndForecasting')}
        name="estimationAndForecasting"
        showAlertEmptyContent={!isPrintingMode()}
        showDashEmptyContent={isPrintingMode()}
        countryIso={countryIso}
        {...props}
      />
      <CommentableDescription
        title={props.i18n.t('description.reclassification')}
        name="reclassification"
        showAlertEmptyContent={!isPrintingMode()}
        countryIso={countryIso}
        showDashEmptyContent={isPrintingMode()}
        {...props}
      />
    </div>
}

const mapStateToProps = (state) => ({ i18n: state.user.i18n })

export default connect(mapStateToProps, {})(AnalysisDescriptions)

