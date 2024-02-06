import React, { useMemo } from 'react'
import { Link as ReactRouterLink } from 'react-router-dom'

import { ApiEndPoint } from 'meta/api/endpoint'
import { RepositoryItem } from 'meta/cycleData'

import { useCountryRouteParams } from 'client/hooks/useRouteParams'

type Props = {
  datum: RepositoryItem
}

const RepositoryLink = (props: Props) => {
  const countryRouteParams = useCountryRouteParams()
  const queryParams = useMemo(() => new URLSearchParams(countryRouteParams), [countryRouteParams])

  const { datum } = props

  if (datum.link) {
    return (
      <a target="_blank" href={datum.link} rel="noreferrer">
        {datum.name}
      </a>
    )
  }

  const url = `${ApiEndPoint.CycleData.Repository.file(datum.uuid)}?${queryParams.toString()}`
  return (
    <ReactRouterLink target="_blank" to={url}>
      {datum.name}
    </ReactRouterLink>
  )
}

export default RepositoryLink
