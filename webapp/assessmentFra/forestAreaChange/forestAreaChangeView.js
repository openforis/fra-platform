import React from 'react'
import tableSpec from './tableSpec'
import { connect } from 'react-redux'
import SingleTraditionalTableView from '../../traditionalTable/singleTraditionalTableView'
import {tableChanged} from '../../traditionalTable/actions'

const ForestAreaChangeView = props =>
  <SingleTraditionalTableView
    {...props}
    headingLocalizationKey="forestAreaChange.forestAreaChange"
    sectionAnchor="1c"
    tableSpecInstance={tableSpec(props.i18n, props.extentOfForest, props.match.params.countryIso, props.tableChanged)}/>

const mapStateToProps = state => ({i18n: state.user.i18n, extentOfForest: state.extentOfForest})

export default connect(mapStateToProps, {tableChanged})(ForestAreaChangeView)
