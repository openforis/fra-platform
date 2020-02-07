import React, { useEffect } from 'react'
import { connect, useSelector } from 'react-redux'

import SingleTraditionalTableView from '@webapp/traditionalTable/singleTraditionalTableView'
import { fetchTableData } from '@webapp/traditionalTable/actions'
import tableSpec from './tableSpec'
import forestOwnershipTableSpec from '../forestOwnership/tableSpec'

import * as AppState from '@webapp/app/appState'
import * as UserState from '@webapp/user/userState'

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
  i18n: UserState.getI18n(state),
  forestOwnershipTableData: state.traditionalTable.forestOwnership
})

export default connect(mapStateToProps, { fetchTableData })(HolderOfManagementRightsView)
