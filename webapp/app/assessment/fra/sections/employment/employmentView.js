import React from 'react'
import { connect } from 'react-redux'

import SingleTraditionalTableView from '@webapp/app/assessment/components/traditionalTable/singleTraditionalTableView'
import tableSpec, { tableProps } from './tableSpec'

import * as AppState from '@webapp/app/appState'

const EmploymentView = props =>
  <SingleTraditionalTableView
    {...props}
    headingLocalizationKey="employment.employment"
    headingDetailsLocalizationKey="employment.average"
    sectionAnchor="7a"
    tableSpecInstance={tableSpec(props.i18n, tableProps.employment)}
    useAnalysisDescriptions={false}/>

const mapStateToProps = state => ({i18n: AppState.getI18n(state)})

export default connect(mapStateToProps)(EmploymentView)
