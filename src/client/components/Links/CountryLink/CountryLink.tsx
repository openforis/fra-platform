import React from 'react'
import { useTranslation } from 'react-i18next'

import { Areas } from 'meta/area/areas'
import { CountryIso } from 'meta/area/countryIso'
import { Routes } from 'meta/routes/routes'

import { useCycleRouteParams } from 'client/hooks/routeParams'
import Icon from 'client/components/Icon'
import Link, { LinkColor } from 'client/components/Links/Link'

type Props = {
  countryIso: CountryIso
}

const CountryLink: React.FC<Props> = (props) => {
  const { countryIso } = props

  const { t } = useTranslation()
  const { assessmentName, cycleName } = useCycleRouteParams()

  const url = Routes.Country.generatePath({ countryIso, cycleName, assessmentName })

  return (
    <Link color={LinkColor.body} rel="noreferrer" target="_blank" to={url}>
      {t(Areas.getTranslationKey(countryIso))}
      <Icon name="external-link" />
    </Link>
  )
}

export default CountryLink
