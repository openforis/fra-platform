import React from 'react'
import { connect } from 'react-redux'
import assert from 'assert'

import CommentableDescription from '../description/commentableDescription'
import { isPrintingMode, isPrintingOnlyTables } from '../printAssessment/printAssessment'

const assertProps = props =>
  assert(
    props.countryIso &&
    props.section,
    'Some property is missing for AnalysisDescriptions'
  )

const AnalysisDescriptions = props => {
  assertProps(props)
  return !isPrintingOnlyTables() &&
    <div className="fra-description__container">
      <h2 className="headline fra-description__group-header">{props.i18n.t('description.analysisAndProcessing')}</h2>
      <CommentableDescription
        title={props.i18n.t('description.estimationAndForecasting')}
        name="estimationAndForecasting"
        showAlertEmptyContent={!isPrintingMode()}
        showDashEmptyContent={isPrintingMode()}
        {...props}
      />
      <CommentableDescription
        title={props.i18n.t('description.reclassification')}
        name="reclassification"
        showAlertEmptyContent={!isPrintingMode()}
        showDashEmptyContent={isPrintingMode()}
        {...props}
      />
    </div>
}

const mapStateToProps = (state) => ({ i18n: state.user.i18n })

export default connect(mapStateToProps, {})(AnalysisDescriptions)

