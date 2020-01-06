import React from 'react'
import { connect } from 'react-redux'
import SingleTraditionalTableView from '@webapp/traditionalTable/singleTraditionalTableView'
import tableSpec from './tableSpec'

const ForestOwnershipView = props =>
  <SingleTraditionalTableView
    {...props}
    headingLocalizationKey="forestOwnership.forestOwnership"
    sectionAnchor="4a"
    tableSpecInstance={tableSpec(props.i18n, props.extentOfForest, props.match.params.countryIso)}/>

const mapStateToProps = state => ({i18n: state.user.i18n, extentOfForest: state.extentOfForest})

export default connect(mapStateToProps)(ForestOwnershipView)
