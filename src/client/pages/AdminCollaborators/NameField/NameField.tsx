import './NameField.scss'
import React from 'react'
import { Link } from 'react-router-dom'

import { Global } from 'meta/area/global'
import { Routes } from 'meta/routes/routes'
import { UserCountrySummary } from 'meta/user/countrySummary'

import { useCycleRouteParams } from 'client/hooks/routeParams'
import Icon from 'client/components/Icon'

type Props = {
  userSummary: UserCountrySummary
}

const NameField: React.FC<Props> = (props: Props) => {
  const { userSummary } = props
  const { fullName, id } = userSummary

  const { assessmentName, cycleName } = useCycleRouteParams()

  const url = Routes.CountryUser.generatePath({ assessmentName, countryIso: Global.WO, cycleName, id: String(id) })

  return (
    <Link className="admin-user-management__user-link" rel="noreferrer" target="_blank" to={url}>
      {fullName}
      <Icon name="external-link" />
    </Link>
  )
}

export default NameField
