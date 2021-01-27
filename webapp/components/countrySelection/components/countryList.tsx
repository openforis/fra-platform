import './countryList.less'

import React from 'react'

// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import * as Fra from '@common/assessment/fra'
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import * as PanEuropean from '@common/assessment/panEuropean'

import AssessmentComponent from '@webapp/components/AssessmentComponent'
import CountryListFra from './CountryListFra'
import CountryListPanEuropean from './CountryListPanEuropean'

const Components = {
  [Fra.type]: CountryListFra,
  [PanEuropean.type]: CountryListPanEuropean,
  null: () => <div />,
}

type Props = {
  query: string
}

const CountryList = (props: Props) => {
  const { query } = props
  // @ts-expect-error ts-migrate(2322) FIXME: Type '{ components: { [x: number]: (props: Props) ... Remove this comment to see the full error message
  return <AssessmentComponent components={Components} query={query} />
}

export default CountryList
