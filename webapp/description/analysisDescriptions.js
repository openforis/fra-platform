import React from 'react'
import CommentableDescription from './commentableDescription'
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
    <h3 className="subhead fra-description__group-header">{props.i18n.t('description.analysisAndProcessing')}</h3>
    <CommentableDescription
      title={props.i18n.t('description.estimationAndForecasting')}
      name="estimationAndForecasting"
      {...props}
    />
    <hr/>
    <CommentableDescription
      title={props.i18n.t('description.reclassification')}
      name="reclassification"
      {...props}
    />
  </div>
}

const mapStateToProps = (state) => ({i18n: state.user.i18n})

export default connect(mapStateToProps, {})(AnalysisDescriptions)

