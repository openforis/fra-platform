import React from 'react'
import { Link as ReactRouterLink } from 'react-router-dom'

import { ApiEndPoint } from 'meta/api/endpoint'
import { Repository as RepositoryType } from 'meta/cycleData'

type Props = {
  datum: RepositoryType
}

const Link = (props: Props) => {
  const { datum } = props

  if (datum.link) {
    return (
      <a target="_blank" href={datum.link} rel="noreferrer">
        {datum.name}
      </a>
    )
  }

  return <ReactRouterLink to={ApiEndPoint.CycleData.Repository.file(datum.fileUuid)}>{datum.name}</ReactRouterLink>
}

export default Link
