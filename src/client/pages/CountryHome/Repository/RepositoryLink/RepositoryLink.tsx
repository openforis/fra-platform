import './RepositoryLink.scss'
import React from 'react'

import { RepositoryItem } from 'meta/cycleData/repository/item'
import { RepositoryItems } from 'meta/cycleData/repository/items'
import { Translations } from 'meta/translation/translations'

import { useLanguage } from 'client/hooks/language'
import { useCountryRouteParams } from 'client/hooks/routeParams'

type Props = {
  datum: RepositoryItem
}

const RepositoryLink: React.FC<Props> = (props) => {
  const { datum } = props

  const { assessmentName, countryIso, cycleName } = useCountryRouteParams()
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
