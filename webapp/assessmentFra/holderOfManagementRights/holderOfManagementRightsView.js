import React, { useEffect } from 'react'
import { connect, useSelector } from 'react-redux'

import SingleTraditionalTableView from '../../traditionalTable/singleTraditionalTableView'
import { fetchTableData } from '../../traditionalTable/actions'
import tableSpec from './tableSpec'
import forestOwnershipTableSpec from '../forestOwnership/tableSpec'

import * as AppState from '../../app/appState'

const HolderOfManagementRightsView = props => {
  const { forestOwnershipTableData, fetchTableData, i18n } = props
  const countryIso = useSelector(AppState.getCountryIso)

  useEffect(() => {
    fetchTableData(countryIso, forestOwnershipTableSpec(i18n))
  }, [])

  return <SingleTraditionalTableView
    {...props}
    headingLocalizationKey="holderOfManagementRights.holderOfManagementRights"
    tadAnchor="4b"
    faqAnchor="4a"
    tableSpecInstance={tableSpec(i18n, forestOwnershipTableData, countryIso)}/>
}

const mapStateToProps = state => ({
  i18n: state.user.i18n,
  forestOwnershipTableData: state.traditionalTable.forestOwnership
})

export default connect(mapStateToProps, { fetchTableData })(HolderOfManagementRightsView)
