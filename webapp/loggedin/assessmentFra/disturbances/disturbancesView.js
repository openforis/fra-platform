import React from 'react'
import { connect } from 'react-redux'
import tableSpec, { tableProps } from './tableSpec'
import SingleTraditionalTableView from '@webapp/traditionalTable/singleTraditionalTableView'
import * as UserState from '@webapp/user/userState'

const DisturbancesView = props =>
  <SingleTraditionalTableView
    {...props}
    headingLocalizationKey="disturbances.disturbances"
    sectionAnchor="5a"
    tableSpecInstance={tableSpec(props.i18n, props.extentOfForest, props.match.params.countryIso, tableProps.disturbances)}/>

const mapStateToProps = state => ({i18n: UserState.getI18n(state), extentOfForest: state.extentOfForest})

export default connect(mapStateToProps)(DisturbancesView)
