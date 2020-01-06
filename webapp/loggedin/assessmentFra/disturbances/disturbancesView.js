import React from 'react'
import { connect } from 'react-redux'
import tableSpec, { tableProps } from './tableSpec'
import SingleTraditionalTableView from '@webapp/traditionalTable/singleTraditionalTableView'

const DisturbancesView = props =>
  <SingleTraditionalTableView
    {...props}
    headingLocalizationKey="disturbances.disturbances"
    sectionAnchor="5a"
    tableSpecInstance={tableSpec(props.i18n, props.extentOfForest, props.match.params.countryIso, tableProps.disturbances)}/>

const mapStateToProps = state => ({i18n: state.user.i18n, extentOfForest: state.extentOfForest})

export default connect(mapStateToProps)(DisturbancesView)
