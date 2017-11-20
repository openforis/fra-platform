import React from 'react'
import { connect } from 'react-redux'
import tableSpec from './tableSpec'
import SingleTraditionalTableView from '../../traditionalTable/singleTraditionalTableView'

const DisturbancesView = props =>
  <SingleTraditionalTableView
    {...props}
    headingLocalizationKey="disturbances.disturbances"
    sectionAnchor="5a"
    tableSpecInstance={tableSpec(props.i18n, props.extentOfForest, props.match.params.countryIso)}/>

const mapStateToProps = state => ({i18n: state.user.i18n, extentOfForest: state.extentOfForest})

export default connect(mapStateToProps)(DisturbancesView)
