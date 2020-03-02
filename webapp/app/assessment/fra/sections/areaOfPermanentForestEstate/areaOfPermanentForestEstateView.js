import React from 'react'
import { connect } from 'react-redux'
import SingleTraditionalTableView from '@webapp/app/assessment/components/traditionalTable/singleTraditionalTableView'
import tableSpec from './tableSpec'

import * as AppState from '@webapp/app/appState'

const AreaOfPermanentForestEstateView = props =>
  <SingleTraditionalTableView
    {...props}
    headingLocalizationKey="areaOfPermanentForestEstate.areaOfPermanentForestEstate"
    sectionAnchor="6b"
    tableSpecInstance={tableSpec(props.i18n, props.extentOfForest)}
    useAnalysisDescriptions={false}/>

const mapStateToProps = state => ({i18n: AppState.getI18n(state), extentOfForest: state.extentOfForest})

export default connect(mapStateToProps)(AreaOfPermanentForestEstateView)
