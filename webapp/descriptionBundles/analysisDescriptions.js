import React from 'react'
import CommentableDescription from '../description/commentableDescription'
import { connect } from 'react-redux'
import assert from 'assert'

const assertProps = props =>
  assert(
    props.countryIso &&
    props.section,
    'Some property is missing for AnalysisDescriptions'
  )

const AnalysisDescriptions = props => {
  assertProps(props)
  return <div className="fra-description__container">
    <h2 className="headline fra-description__group-header">{props.i18n.t('description.analysisAndProcessing')}</h2>
    <CommentableDescription
      title={props.i18n.t('description.estimationAndForecasting')}
      name="estimationAndForecasting"
      showAlertEmptyContent={true}
      {...props}
    />
    <CommentableDescription
      title={props.i18n.t('description.reclassification')}
      name="reclassification"
      showAlertEmptyContent={true}
      {...props}
    />
  </div>
}

const mapStateToProps = (state) => ({i18n: state.user.i18n})

export default connect(mapStateToProps, {})(AnalysisDescriptions)

