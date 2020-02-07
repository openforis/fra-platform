import React from 'react'
import { connect } from 'react-redux'

import SingleTraditionalTableView from '@webapp/traditionalTable/singleTraditionalTableView'
import tableSpec, { tableProps } from './tableSpec'

import * as UserState from '@webapp/user/userState'

const GraduationOfStudentsView = props =>
  <SingleTraditionalTableView
    {...props}
    headingLocalizationKey="graduationOfStudents.graduationOfStudents"
    headingDetailsLocalizationKey="graduationOfStudents.average"
    sectionAnchor="7b"
    tableSpecInstance={tableSpec(props.i18n, tableProps.graduationOfStudents)}
    useAnalysisDescriptions={false}/>

const mapStateToProps = state => ({i18n: UserState.getI18n(state)})

export default connect(mapStateToProps)(GraduationOfStudentsView)
