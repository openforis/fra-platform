import './style.less'

import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'
import { useParams } from 'react-router-dom'

import { setPrintingMode } from './printAssessment'

import AssessmentFraPrintView from '@webapp/loggedin/assessmentFra/assessmentFraPrintView'

import * as UserState from '@webapp/user/userState'

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
  i18n: UserState.getI18n(state)
})

export default connect(mapStateToProps)(PrintAssessmentView)
