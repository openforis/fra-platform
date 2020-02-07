import React from 'react'
import tableSpec, { sectionName } from './tableSpec'
import { connect } from 'react-redux'
import SingleTraditionalTableView from '@webapp/traditionalTable/singleTraditionalTableView'
import { isFRA2020SectionEditDisabled } from '@webapp/utils/assessmentAccess'

import * as UserState from '@webapp/user/userState'

const ForestAreaChangeView = props =>
  <SingleTraditionalTableView
    {...props}
    headingLocalizationKey="forestAreaChange.forestAreaChange"
    sectionAnchor="1c"
    tableSpecInstance={tableSpec(props.i18n, props.extentOfForest, props.match.params.countryIso, props.isEditDataDisabled)}/>

const mapStateToProps = state => ({
  i18n: UserState.getI18n(state),
  extentOfForest: state.extentOfForest,
  isEditDataDisabled: isFRA2020SectionEditDisabled(state, sectionName)
})

export default connect(mapStateToProps)(ForestAreaChangeView)
