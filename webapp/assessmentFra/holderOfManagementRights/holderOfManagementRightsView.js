import React from 'react'
import { connect } from 'react-redux'
import SingleTraditionalTableView from '../../traditionalTable/singleTraditionalTableView'
import { fetchTableData } from '../../traditionalTable/actions'
import tableSpec from './tableSpec'
import forestOwnershipTableSpec from '../forestOwnership/tableSpec'

class HolderOfManagementRightsView extends React.Component {

  componentDidMount () {
    this.props.fetchTableData(this.props.match.params.countryIso, forestOwnershipTableSpec(this.props.i18n))
  }

  render () {
    return <SingleTraditionalTableView
      {...this.props}
      headingLocalizationKey="holderOfManagementRights.holderOfManagementRights"
      tadAnchor="4b"
      faqAnchor="4a"
      tableSpecInstance={tableSpec(this.props.i18n, this.props.forestOwnershipTableData, this.props.match.params.countryIso)}/>
  }
}

const mapStateToProps = state => ({
  i18n: state.user.i18n,
  forestOwnershipTableData: state.traditionalTable.forestOwnership
})

export default connect(mapStateToProps, {fetchTableData})(HolderOfManagementRightsView)


