import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { Users } from 'meta/user'

import { useCycle } from 'client/store/assessment'
import { useUser } from 'client/store/user'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import Icon from 'client/components/Icon'

const InviteUserLink: React.FC = () => {
  const { t } = useTranslation()
  const user = useUser()
  const { countryIso } = useCountryRouteParams()
  const cycle = useCycle()

  if (!Users.getRolesAllowedToEdit({ user, countryIso, cycle }).length) return null

  return (
    <Link to="invite" className="btn-s btn-primary">
      <Icon className="icon-sub icon-white" name="small-add" /> {t('userManagement.addUser')}
    </Link>
  )
}

export default InviteUserLink
