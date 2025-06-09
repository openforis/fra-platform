import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { CountryIso } from 'meta/area'
import { Routes } from 'meta/routes'
import { Authorizer } from 'meta/user'
import { CountryUserSummaries } from 'meta/user/countryUserSummaries'

import { useCycle } from 'client/store/meta/hooks/cycles'
import { useUser } from 'client/store/user/hooks/user'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { ButtonSize, ButtonType, useButtonClassName } from 'client/components/Buttons/Button'
import Icon from 'client/components/Icon'

import { Props } from '../../Props'

const size = ButtonSize.xs
const type = ButtonType.primary

const Edit: React.FC<Props> = (props: Props) => {
  const { user } = props
  const { id } = user

  const { t } = useTranslation()
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()
  const currentUser = useUser()
  const cycle = useCycle()

  const isEdit = Authorizer.canEditUser({ cycle, countryIso, user: currentUser, target: user })
  const label = t(isEdit ? 'userManagement.edit' : 'common.view')
  const iconName = isEdit ? 'pencil' : 'icon-eye'
  const className = useButtonClassName({ iconName, label, size, type, className: 'home-user-action-button-edit' })

  if (CountryUserSummaries.isInvitation(user, countryIso)) {
    return null
  }

  const to = Routes.CountryUser.generatePath({ countryIso, assessmentName, cycleName, id })

  return (
    <Link className={className} to={to} type="button">
      <Icon name={iconName} /> {label}
    </Link>
  )
}
export default Edit
