import React, { useEffect } from 'react'
import { connect, useSelector } from 'react-redux'

import SingleTraditionalTableView from '../../traditionalTable/singleTraditionalTableView'
import tableSpec from './tableSpec'
import { fetchItem } from '../../tableWithOdp/actions'
import * as AppState from '@webapp/app/appState'

const SpecificForestCategories = props => {
  const {
    fetchItem,
    i18n,
    extentOfForest,
    forestCharacteristics
  } = props
  const countryIso = useSelector(AppState.getCountryIso)

  useEffect(() => {
    fetchItem('forestCharacteristics', countryIso)
  }, [countryIso])

  return <SingleTraditionalTableView
    {...props}
    headingLocalizationKey="specificForestCategories.specificForestCategories"
    sectionAnchor="1e"
    tableSpecInstance={tableSpec(i18n, extentOfForest, forestCharacteristics)}/>
}

const mapStateToProps = state => ({
  i18n: state.user.i18n,
  extentOfForest: state.extentOfForest,
  forestCharacteristics: state.forestCharacteristics
})

export default connect(mapStateToProps, { fetchItem })(SpecificForestCategories)
