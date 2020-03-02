import React from 'react'
import { connect } from 'react-redux'
import SingleTraditionalTableView from '@webapp/app/assessment/components/traditionalTable/singleTraditionalTableView'
import tableSpec from './tableSpec'

import * as AppState from '@webapp/app/appState'

const ForestOwnershipView = props =>
  <SingleTraditionalTableView
    {...props}
    headingLocalizationKey="forestOwnership.forestOwnership"
    sectionAnchor="4a"
    tableSpecInstance={tableSpec(props.i18n, props.extentOfForest, props.match.params.countryIso)}/>

const mapStateToProps = state => ({i18n: AppState.getI18n(state), extentOfForest: state.extentOfForest})

export default connect(mapStateToProps)(ForestOwnershipView)
