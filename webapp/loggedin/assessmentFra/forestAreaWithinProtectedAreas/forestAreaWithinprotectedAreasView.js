import React from 'react'
import SingleTraditionalTableView from '@webapp/traditionalTable/singleTraditionalTableView'
import { connect } from 'react-redux'
import tableSpec from './tableSpec'

import * as UserState from '@webapp/user/userState'

const ForestAreaWithinProtectedAreasView = props =>
  <SingleTraditionalTableView
    {...props}
    headingLocalizationKey="forestAreaWithinProtectedAreas.forestAreaWithinProtectedAreas"
    sectionAnchor="3b"
    tableSpecInstance={tableSpec(props.i18n, props.extentOfForest)}/>

const mapStateToProps = state => ({i18n: UserState.getI18n(state), extentOfForest: state.extentOfForest})

export default connect(mapStateToProps)(ForestAreaWithinProtectedAreasView)
