import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import { Routes } from 'meta/routes/routes'
import { Users } from 'meta/user/users'

import { useCycle } from 'client/store/meta/hooks/cycles'
import { useUser } from 'client/store/user/hooks/user'
import { useCountryRouteParams } from 'client/hooks/routeParams'
import { ButtonSize, useButtonClassName } from 'client/components/Buttons/Button'
import Icon from 'client/components/Icon'

const Invite: React.FC = () => {
  const { t } = useTranslation()
  const user = useUser()
  const { countryIso } = useCountryRouteParams()
  const cycle = useCycle()
  const className = useButtonClassName({
    className: 'btn-invite',
    iconName: 'small-add',
    label: 'L',
    size: ButtonSize.s,
  })

  if (!Users.getRolesAllowedToEdit({ user, countryIso, cycle }).length) return null

  return (
    <Link className={className} to={Routes.CountryHomeSectionInvite.path.relative}>
      <Icon className="icon-white" name="small-add" /> {t('userManagement.addUser')}
    </Link>
  )
}

export default Invite
