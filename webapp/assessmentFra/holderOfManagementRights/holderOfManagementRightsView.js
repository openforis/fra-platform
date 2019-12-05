import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'

import SingleTraditionalTableView from '../../traditionalTable/singleTraditionalTableView'
import { fetchTableData } from '../../traditionalTable/actions'
import tableSpec from './tableSpec'
import forestOwnershipTableSpec from '../forestOwnership/tableSpec'

const HolderOfManagementRightsView = props => {
  const { forestOwnershipTableData, fetchTableData, i18n } = props
  const { countryIso } = useParams()

  useEffect(() => {
    fetchTableData(countryIso, forestOwnershipTableSpec(i18n))
  }, [])

  return <SingleTraditionalTableView
    {...props}
    headingLocalizationKey="holderOfManagementRights.holderOfManagementRights"
    tadAnchor="4b"
    faqAnchor="4a"
    tableSpecInstance={tableSpec(i18n, forestOwnershipTableData, countryIso)} />
}

const mapStateToProps = state => ({
  i18n: state.user.i18n,
  forestOwnershipTableData: state.traditionalTable.forestOwnership
})

export default connect(mapStateToProps, { fetchTableData })(HolderOfManagementRightsView)
