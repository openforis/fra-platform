import React from 'react'
import { connect } from 'react-redux'
import SingleTraditionalTableView from '../../traditionalTable/singleTraditionalTableView'
import tableSpec from './tableSpec'

const OtherLandWithTreeCoverView = props =>
  <SingleTraditionalTableView
    {...props}
    headingLocalizationKey="otherLandWithTreeCover.otherLandWithTreeCover"
    faqAnchor="1a"
    tadAnchor="1f"
    tableSpecInstance={tableSpec(props.i18n, props.extentOfForest)}/>

const mapStateToProps = state => ({i18n: state.user.i18n, extentOfForest: state.extentOfForest})

export default connect(mapStateToProps)(OtherLandWithTreeCoverView)
