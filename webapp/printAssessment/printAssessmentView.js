import './style.less'

import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'
import { setPrintingMode } from './printAssessment'

import AssessmentFraPrintView from './../assessmentFra/assessmentFraPrintView'

const views = [{
  assessment: 'fra2020', component: AssessmentFraPrintView
}]

const PrintAssessmentView = (props) => {

  setPrintingMode()

  const {match, i18n} = props
  const {assessment} = match.params

  const {component} = R.find(R.propEq('assessment', assessment), views)

  return <div className="fra-print__container">
    <h1>{i18n.t('assessment.' + assessment)}</h1>
    <hr/>
    {React.createElement(component, {...props})}
  </div>

}

const mapStateToProps = state => ({
  i18n: state.user.i18n
})

export default connect(mapStateToProps)(PrintAssessmentView)
