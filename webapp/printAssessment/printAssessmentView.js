import './style.less'

import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'
import { useParams } from 'react-router-dom'

import { setPrintingMode } from './printAssessment'

import AssessmentFraPrintView from './../assessmentFra/assessmentFraPrintView'

const views = [{
  assessment: 'fra2020', component: AssessmentFraPrintView
}]

const PrintAssessmentView = (props) => {

  setPrintingMode()

  const { assessment } = useParams()

  const { component } = R.find(R.propEq('assessment', assessment), views)

  return <div className="fra-print__container">
    {React.createElement(component, { ...props })}
  </div>

}

const mapStateToProps = state => ({
  i18n: state.user.i18n
})

export default connect(mapStateToProps)(PrintAssessmentView)
