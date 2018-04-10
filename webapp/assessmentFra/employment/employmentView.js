import React from 'react'
import { connect } from 'react-redux'

import SingleTraditionalTableView from '../../traditionalTable/singleTraditionalTableView'
import tableSpec, { tableProps } from './tableSpec'

const EmploymentView = props =>
  <SingleTraditionalTableView
    {...props}
    headingLocalizationKey="employment.employment"
    headingDetailsLocalizationKey="employment.average"
    sectionAnchor="7a"
    tableSpecInstance={tableSpec(props.i18n, tableProps.employment)}
    useAnalysisDescriptions={false}/>

const mapStateToProps = state => ({i18n: state.user.i18n})

export default connect(mapStateToProps)(EmploymentView)
