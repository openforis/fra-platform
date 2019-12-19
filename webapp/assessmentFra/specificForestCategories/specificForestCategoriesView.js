import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'

import SingleTraditionalTableView from '../../traditionalTable/singleTraditionalTableView'
import tableSpec from './tableSpec'
import { fetchItem } from '../../tableWithOdp/actions'

const SpecificForestCategories = props => {
  const {
    fetchItem,
    i18n,
    extentOfForest,
    forestCharacteristics
  } = props
  const { countryIso } = useParams()

  useEffect(() => {
    fetchItem('forestCharacteristics', countryIso)
  }, [countryIso])

  return <SingleTraditionalTableView
    {...props}
    headingLocalizationKey="specificForestCategories.specificForestCategories"
    sectionAnchor="1e"
    tableSpecInstance={tableSpec(i18n, extentOfForest, forestCharacteristics)} />
}

const mapStateToProps = state => ({
  i18n: state.user.i18n,
  extentOfForest: state.extentOfForest,
  forestCharacteristics: state.forestCharacteristics
})

export default connect(mapStateToProps, { fetchItem })(SpecificForestCategories)
