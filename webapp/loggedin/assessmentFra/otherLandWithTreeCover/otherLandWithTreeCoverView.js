import React from 'react'
import * as R from 'ramda'
import { connect } from 'react-redux'
import SingleTraditionalTableView from '@webapp/traditionalTable/singleTraditionalTableView'
import tableSpec from './tableSpec'

import * as UserState from '@webapp/user/userState'

const OtherLandWithTreeCoverView = props =>
  <SingleTraditionalTableView
    {...props}
    headingLocalizationKey="otherLandWithTreeCover.otherLandWithTreeCover"
    faqAnchor="1a"
    tadAnchor="1f"
    tableSpecInstance={tableSpec(props.i18n, props.extentOfForest, props.faoStat, props.match.params.countryIso)}
  />

const mapStateToProps = state => ({
  i18n: UserState.getI18n(state),
  extentOfForest: state.extentOfForest,
  faoStat: R.path(['country', 'config', 'faoStat'], state)
})

export default connect(mapStateToProps)(OtherLandWithTreeCoverView)
