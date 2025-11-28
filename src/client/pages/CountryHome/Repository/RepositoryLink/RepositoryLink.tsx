import React from 'react'

import { RepositoryItem } from 'meta/cycleData/repository/item'
import { RepositoryItems } from 'meta/cycleData/repository/items'
import { Translations } from 'meta/translation/translations'

import { useLanguage } from 'client/hooks/language'
import { useCountryRouteParams } from 'client/hooks/routeParams'
import Link from 'client/components/Links/Link'

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
    <Link rel="noreferrer" target="_blank" to={url}>
      {label}
    </Link>
  )
}

export default RepositoryLink
