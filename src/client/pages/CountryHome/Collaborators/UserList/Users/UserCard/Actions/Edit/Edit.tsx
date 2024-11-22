import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { CountryIso } from 'meta/area'
import { Routes } from 'meta/routes'
import { Users } from 'meta/user'
import { CountryUserSummaries } from 'meta/user/countryUserSummaries'

import { useCycle } from 'client/store/assessment'
import { useUser } from 'client/store/user'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { ButtonSize, ButtonType, useButtonClassName } from 'client/components/Buttons/Button'
import Icon from 'client/components/Icon'

import { Props } from '../../Props'

const Edit: React.FC<Props> = (props: Props) => {
  const { user } = props

  const { t } = useTranslation()

  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()
  const currentUser = useUser()
  const { id } = user
  const cycle = useCycle()

  const currentUserIsReviewer = Users.isReviewer(currentUser, countryIso, cycle)
  const label = t(currentUserIsReviewer ? 'common.view' : 'userManagement.edit')
  const iconName = currentUserIsReviewer ? 'icon-eye' : 'pencil'
  const size = ButtonSize.s
  const type = ButtonType.primary
  const inverse = true
  const className = useButtonClassName({ iconName, label, size, inverse, type })

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
