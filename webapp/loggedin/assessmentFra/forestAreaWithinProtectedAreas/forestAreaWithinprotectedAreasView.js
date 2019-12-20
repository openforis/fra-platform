import React from 'react'
import SingleTraditionalTableView from '@webapp/traditionalTable/singleTraditionalTableView'
import { connect } from 'react-redux'
import tableSpec from './tableSpec'

const ForestAreaWithinProtectedAreasView = props =>
  <SingleTraditionalTableView
    {...props}
    headingLocalizationKey="forestAreaWithinProtectedAreas.forestAreaWithinProtectedAreas"
    sectionAnchor="3b"
    tableSpecInstance={tableSpec(props.i18n, props.extentOfForest)}/>

const mapStateToProps = state => ({i18n: state.user.i18n, extentOfForest: state.extentOfForest})

export default connect(mapStateToProps)(ForestAreaWithinProtectedAreasView)
