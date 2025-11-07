import './CountryLink.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { Areas } from 'meta/area/areas'
import { CountryIso } from 'meta/area/countryIso'
import { Routes } from 'meta/routes'

import { useCycleRouteParams } from 'client/hooks/routeParams'
import Icon from 'client/components/Icon'

type Props = {
  countryIso: CountryIso
}

const CountryLink: React.FC = (props: Props) => {
  const { countryIso } = props

  const { t } = useTranslation()
  const { assessmentName, cycleName } = useCycleRouteParams()

  const url = Routes.Country.generatePath({ countryIso, cycleName, assessmentName })

  return (
    <Link className="admin-countries__country-link" rel="noreferrer" target="_blank" to={url}>
      {t(Areas.getTranslationKey(countryIso))}
      <Icon name="external-link" />
    </Link>
  )
}

export default CountryLink
