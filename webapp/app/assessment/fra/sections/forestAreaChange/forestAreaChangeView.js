import React from 'react'
import tableSpec, { sectionName } from './tableSpec'
import { connect } from 'react-redux'
import SingleTraditionalTableView from '@webapp/app/assessment/components/traditionalTable/singleTraditionalTableView'
import { isFRA2020SectionEditDisabled } from '@webapp/utils/assessmentAccess'

import * as AppState from '@webapp/app/appState'

const ForestAreaChangeView = props =>
  <SingleTraditionalTableView
    {...props}
    headingLocalizationKey="forestAreaChange.forestAreaChange"
    sectionAnchor="1c"
    tableSpecInstance={tableSpec(props.i18n, props.extentOfForest, props.match.params.countryIso, props.isEditDataDisabled)}/>

const mapStateToProps = state => ({
  i18n: AppState.getI18n(state),
  extentOfForest: state.extentOfForest,
  isEditDataDisabled: isFRA2020SectionEditDisabled(state, sectionName)
})

export default connect(mapStateToProps)(ForestAreaChangeView)
