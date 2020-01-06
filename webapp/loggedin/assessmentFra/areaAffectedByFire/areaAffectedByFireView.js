import React from 'react'
import { connect } from 'react-redux'
import SingleTraditionalTableView from '@webapp/traditionalTable/singleTraditionalTableView'
import tableSpec, { tableProps } from './tableSpec'

const AreaAffectedByFireView = props =>
  <SingleTraditionalTableView
    {...props}
    headingLocalizationKey="areaAffectedByFire.areaAffectedByFire"
    sectionAnchor="5b"
    tableSpecInstance={tableSpec(props.i18n, tableProps.areaAffectedByFire)}/>

const mapStateToProps = state => ({i18n: state.user.i18n})

export default connect(mapStateToProps)(AreaAffectedByFireView)
