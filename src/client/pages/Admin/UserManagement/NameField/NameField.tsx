import './NameField.scss'
import React from 'react'
import { Link } from 'react-router-dom'

import { Global } from 'meta/area'
import { Routes } from 'meta/routes'
import { User, Users } from 'meta/user'

import { useCycleRouteParams } from 'client/hooks/useRouteParams'
import Icon from 'client/components/Icon'

type Props = {
  user: User
}

const NameField: React.FC<Props> = (props: Props) => {
  const { user } = props

  const { assessmentName, cycleName } = useCycleRouteParams()

  const url = Routes.CountryUser.generatePath({
    assessmentName,
    countryIso: Global.WO,
    cycleName,
    id: user.id,
  })

  return (
    <Link className="admin-user-management__user-link" rel="noreferrer" target="_blank" to={url}>
      {Users.getFullName(user)}
      <Icon name="external-link" />
    </Link>
  )
}

export default NameField
