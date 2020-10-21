import './countryList.less'

import React from 'react'
import PropTypes from 'prop-types'

import * as Fra from '@common/assessment/fra'
import * as PanEuropean from '@common/assessment/panEuropean'

import AssessmentComponent from '@webapp/components/AssessmentComponent'
import CountryListFra from './CountryListFra'
import CountryListPanEuropean from './CountryListPanEuropean'

const Components = {
  [Fra.type]: CountryListFra,
  [PanEuropean.type]: CountryListPanEuropean,
  null: () => <div />,
}

const CountryList = (props) => {
  const { query } = props
  return <AssessmentComponent components={Components} query={query} />
}

CountryList.propTypes = {
  query: PropTypes.string.isRequired,
}

export default CountryList
