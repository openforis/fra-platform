import React from 'react'
import tableSpec, { sectionName } from './tableSpec'
import { connect } from 'react-redux'
import SingleTraditionalTableView from '../../traditionalTable/singleTraditionalTableView'
import { isFRA2020SectionEditDisabled } from '../../utils/assessmentAccess'

const ForestAreaChangeView = props =>
  <SingleTraditionalTableView
    {...props}
    headingLocalizationKey="forestAreaChange.forestAreaChange"
    sectionAnchor="1c"
    tableSpecInstance={tableSpec(props.i18n, props.extentOfForest, props.match.params.countryIso, props.isEditDataDisabled)}/>

const mapStateToProps = state => ({
  i18n: state.user.i18n,
  extentOfForest: state.extentOfForest,
  isEditDataDisabled: isFRA2020SectionEditDisabled(state, sectionName)
})

export default connect(mapStateToProps)(ForestAreaChangeView)
