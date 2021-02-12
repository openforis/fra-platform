import './countryList.less'

import React from 'react'

import FRA from '@common/assessment/fra'
import PanEuropean from '@common/assessment/panEuropean'

import AssessmentComponent from '@webapp/components/AssessmentComponent'
import CountryListFra from './CountryListFra'
import CountryListPanEuropean from './CountryListPanEuropean'

const Components: any = {
  [FRA.type]: CountryListFra,
  [PanEuropean.type]: CountryListPanEuropean,
  null: () => <div />,
}

type Props = {
  query: string
}

const CountryList = (props: Props) => {
  const { query } = props
  return <AssessmentComponent components={Components} query={query} />
}

export default CountryList
