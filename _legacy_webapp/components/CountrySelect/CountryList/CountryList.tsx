import './countryList.scss'

import React from 'react'

import { FRA, PanEuropean } from '@core/assessment'

import AssessmentSwitch from '../../../components/Assessment/AssessmentSwitch'
import CountryListFra from './CountryListFra'
import CountryListPanEuropean from './CountryListPanEuropean'

const Components: Record<string, React.FC> = {
  [FRA.type]: CountryListFra,
  [PanEuropean.type]: CountryListPanEuropean,
  null: () => <div />,
}

type Props = {
  query: string
}

const CountryList: React.FC<Props> = (props: Props) => {
  const { query } = props
  return <AssessmentSwitch components={Components} query={query} />
}

export default CountryList
