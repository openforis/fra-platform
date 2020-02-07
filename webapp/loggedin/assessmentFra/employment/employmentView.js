import React from 'react'
import { connect } from 'react-redux'

import SingleTraditionalTableView from '@webapp/traditionalTable/singleTraditionalTableView'
import tableSpec, { tableProps } from './tableSpec'

import * as UserState from '@webapp/user/userState'

const EmploymentView = props =>
  <SingleTraditionalTableView
    {...props}
    headingLocalizationKey="employment.employment"
    headingDetailsLocalizationKey="employment.average"
    sectionAnchor="7a"
    tableSpecInstance={tableSpec(props.i18n, tableProps.employment)}
    useAnalysisDescriptions={false}/>

const mapStateToProps = state => ({i18n: UserState.getI18n(state)})

export default connect(mapStateToProps)(EmploymentView)
