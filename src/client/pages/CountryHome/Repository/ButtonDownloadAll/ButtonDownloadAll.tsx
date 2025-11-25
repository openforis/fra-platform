import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryIso } from 'meta/area/countryIso'

import { useCountryRouteParams } from 'client/hooks/routeParams'
import { ButtonSize, useButtonClassName } from 'client/components/Buttons/Button'
import Icon from 'client/components/Icon'

type Props = {
  isGlobal?: boolean
}

const ButtonDownloadAll: React.FC<Props> = (props: Props) => {
  const { isGlobal = false } = props
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()
  const { t } = useTranslation()

  const label = t('common.all')
  const className = useButtonClassName({ iconName: 'hit-down', label, size: ButtonSize.xs })

  const queryParams = new URLSearchParams({ assessmentName, cycleName, countryIso, global: String(isGlobal) })

  return (
    <Link className={className} target="_blank" to={`${ApiEndPoint.CycleData.Repository.File.many()}?${queryParams}`}>
      <Icon className="icon-white" name="hit-down" />
      {label}
    </Link>
  )
}

export default ButtonDownloadAll
