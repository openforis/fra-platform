import React from 'react'
import * as R from 'ramda'
import { connect } from 'react-redux'
import SingleTraditionalTableView from '../../traditionalTable/singleTraditionalTableView'
import tableSpec from './tableSpec'

const OtherLandWithTreeCoverView = props =>
  <SingleTraditionalTableView
    {...props}
    headingLocalizationKey="otherLandWithTreeCover.otherLandWithTreeCover"
    faqAnchor="1a"
    tadAnchor="1f"
    tableSpecInstance={tableSpec(props.i18n, props.extentOfForest, props.faoStat, props.match.params.countryIso)}
  />

const mapStateToProps = state => ({
  i18n: state.user.i18n,
  extentOfForest: state.extentOfForest,
  faoStat: R.path(['country', 'config', 'faoStat'], state)
})

export default connect(mapStateToProps)(OtherLandWithTreeCoverView)
