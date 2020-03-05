import React from 'react'
import tableSpec, { sectionName } from './tableSpec'
import { connect } from 'react-redux'
import SingleTraditionalTableView from '@webapp/app/assessment/components/traditionalTable/singleTraditionalTableView'

import * as AppState from '@webapp/app/appState'
import { isSectionEditDisabled } from '@webapp/app/assessment/fra/fraState'

const ForestAreaChangeView = props =>
  <SingleTraditionalTableView
    {...props}
    headingLocalizationKey="forestAreaChange.forestAreaChange"
    sectionAnchor="1c"
    tableSpecInstance={tableSpec(props.i18n, props.extentOfForest, props.match.params.countryIso, props.isEditDataDisabled)}/>

const mapStateToProps = state => ({
  i18n: AppState.getI18n(state),
  extentOfForest: state.extentOfForest,
  isEditDataDisabled: isSectionEditDisabled(state, sectionName)
})

export default connect(mapStateToProps)(ForestAreaChangeView)
