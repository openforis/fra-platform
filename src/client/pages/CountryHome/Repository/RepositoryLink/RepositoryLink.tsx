import './RepositoryLink.scss'
import React from 'react'

import { RepositoryItem, RepositoryItems } from 'meta/cycleData'
import { Translations } from 'meta/translation'

import { useLanguage } from 'client/hooks/useLanguage'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

type Props = {
  datum: RepositoryItem
}

const RepositoryLink = (props: Props) => {
  const { datum } = props

  const { assessmentName, cycleName, countryIso } = useCountryRouteParams()
  const language = useLanguage()

  const label = Translations.getLabel({ translation: datum.props.translation, language })
  const url = RepositoryItems.getURL({ repositoryItem: datum, assessmentName, cycleName, countryIso })

  return (
    <a className="repository-link" href={url} rel="noreferrer" target="_blank">
      {label}
    </a>
  )
}

export default RepositoryLink
