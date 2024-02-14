import React from 'react'
import { Link as ReactRouterLink } from 'react-router-dom'

import { RepositoryItem } from 'meta/cycleData'
import { RepositoryItems } from 'meta/cycleData/repository/repositoryItems'

import { useCountryRouteParams } from 'client/hooks/useRouteParams'

type Props = {
  datum: RepositoryItem
}

const RepositoryLink = (props: Props) => {
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams()

  const { datum } = props

  if (datum.link) {
    return (
      <a target="_blank" href={datum.link} rel="noreferrer">
        {datum.name}
      </a>
    )
  }

  const url = RepositoryItems.getURL({ repositoryItem: datum, assessmentName, cycleName, countryIso })
  return (
    <ReactRouterLink target="_blank" to={url}>
      {datum.name}
    </ReactRouterLink>
  )
}

export default RepositoryLink
