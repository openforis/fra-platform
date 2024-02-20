import React from 'react'
import { Link as ReactRouterLink } from 'react-router-dom'

import { RepositoryItem, RepositoryItems } from 'meta/cycleData'
import { Translations } from 'meta/translation'

import { useLanguage } from 'client/hooks/useLanguage'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

type Props = {
  datum: RepositoryItem
}

const RepositoryLink = (props: Props) => {
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams()
  const language = useLanguage()

  const { datum } = props
  const name = Translations.getLabel({ translation: datum.props.translation, language })

  if (datum.link) {
    return (
      <a target="_blank" href={datum.link} rel="noreferrer">
        {name}
      </a>
    )
  }

  const url = RepositoryItems.getURL({ repositoryItem: datum, assessmentName, cycleName, countryIso })
  return (
    <ReactRouterLink target="_blank" to={url}>
      {name}
    </ReactRouterLink>
  )
}

export default RepositoryLink
