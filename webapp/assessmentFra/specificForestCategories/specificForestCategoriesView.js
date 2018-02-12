import React from 'react'
import { connect } from 'react-redux'

import SingleTraditionalTableView from '../../traditionalTable/singleTraditionalTableView'
import tableSpec from './tableSpec'

const SpecificForestCategories = props =>
  <SingleTraditionalTableView
    {...props}
    headingLocalizationKey="specificForestCategories.specificForestCategories"
    sectionAnchor="1e"
    tableSpecInstance={tableSpec(props.i18n, props.extentOfForest)}/>

const mapStateToProps = state => ({
  i18n: state.user.i18n,
  extentOfForest: state.extentOfForest
})

export default connect(mapStateToProps)(SpecificForestCategories)
