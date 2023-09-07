import React from 'react'
import { Link } from 'react-router-dom'

import { CountryIso } from 'meta/area'
import { Routes } from 'meta/routes'

import { useCycleRouteParams } from 'client/hooks/useRouteParams'
import Icon from 'client/components/Icon'

type Props = {
  countryIso: CountryIso
}

const CountryLink = (props: Props) => {
  const { countryIso } = props
  const { assessmentName, cycleName } = useCycleRouteParams()

  const url = Routes.Country.generatePath({ countryIso, cycleName, assessmentName })

  return (
    <Link target="_blank" rel="noreferrer" to={url}>
      <Icon name="external-link" />
    </Link>
  )
}

export default CountryLink
