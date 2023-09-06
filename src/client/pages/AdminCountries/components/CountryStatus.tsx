import React from 'react'

import { AssessmentStatus } from 'meta/area/country'

import CountryStatusIndicator from 'client/components/CountryStatusIndicator'

type Props = {
  status: AssessmentStatus
}

const CountryStatus = (props: Props) => {
  const { status } = props

  return <CountryStatusIndicator status={status} />
}

export default CountryStatus
