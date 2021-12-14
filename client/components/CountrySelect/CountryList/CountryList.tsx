import './countryList.scss'

import React from 'react'

import AssessmentSwitch from '@client/components/AssessmentSwitch'
import { AssessmentName } from '@meta/assessment'
// import CountryListFra from './CountryListFra'
// import CountryListPanEuropean from './CountryListPanEuropean'

const Components: Record<string, React.FC> = {
  // [AssessmentName.fra]: CountryListFra,
  [AssessmentName.fra]: () => <div />,
  // [AssessmentName.panEuropean]: CountryListPanEuropean,
  [AssessmentName.panEuropean]: () => <div />,
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
