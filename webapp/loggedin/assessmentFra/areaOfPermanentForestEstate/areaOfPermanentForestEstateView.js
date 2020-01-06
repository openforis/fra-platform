import React from 'react'
import { connect } from 'react-redux'
import SingleTraditionalTableView from '@webapp/traditionalTable/singleTraditionalTableView'
import tableSpec from './tableSpec'

const AreaOfPermanentForestEstateView = props =>
  <SingleTraditionalTableView
    {...props}
    headingLocalizationKey="areaOfPermanentForestEstate.areaOfPermanentForestEstate"
    sectionAnchor="6b"
    tableSpecInstance={tableSpec(props.i18n, props.extentOfForest)}
    useAnalysisDescriptions={false}/>

const mapStateToProps = state => ({i18n: state.user.i18n, extentOfForest: state.extentOfForest})

export default connect(mapStateToProps)(AreaOfPermanentForestEstateView)
