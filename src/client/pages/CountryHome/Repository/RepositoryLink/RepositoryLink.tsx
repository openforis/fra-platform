import React from 'react'

import { RepositoryItem, RepositoryItems } from 'meta/cycleData'
import { Translations } from 'meta/translation'

import { useLanguage } from 'client/hooks/useLanguage'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

type Props = {
  datum: RepositoryItem
  name?: string
}

const RepositoryLink = (props: Props) => {
  const { datum, name } = props
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams()
  const language = useLanguage()

  const label = name ?? Translations.getLabel({ translation: datum.props.translation, language })
  const url = RepositoryItems.getURL({ repositoryItem: datum, assessmentName, cycleName, countryIso })

  return (
    <a href={url} rel="noreferrer" target="_blank">
      {label}
    </a>
  )
}

RepositoryLink.defaultProps = {
  name: undefined,
}

export default RepositoryLink
