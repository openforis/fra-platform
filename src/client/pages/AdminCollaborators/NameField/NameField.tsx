import './NameField.scss'
import React from 'react'
import { Link } from 'react-router-dom'

import { Global } from 'meta/area'
import { Routes } from 'meta/routes'
import { CountryUserSummary } from 'meta/user'

import { useCycleRouteParams } from 'client/hooks/useRouteParams'
import Icon from 'client/components/Icon'

type Props = {
  userSummary: CountryUserSummary
}

const NameField: React.FC<Props> = (props: Props) => {
  const { userSummary } = props
  const { id, fullName } = userSummary

  const { assessmentName, cycleName } = useCycleRouteParams()

  const url = Routes.CountryUser.generatePath({ assessmentName, countryIso: Global.WO, cycleName, id })

  return (
    <Link className="admin-user-management__user-link" rel="noreferrer" target="_blank" to={url}>
      {fullName}
      <Icon name="external-link" />
    </Link>
  )
}

export default NameField
