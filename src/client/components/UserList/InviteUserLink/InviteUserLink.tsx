import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import classNames from 'classnames'

import { Routes } from 'meta/routes'
import { Users } from 'meta/user'

import { useCycle } from 'client/store/assessment'
import { useUser } from 'client/store/user'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import Icon from 'client/components/Icon'

type Props = {
  className?: string
}

const InviteUserLink: React.FC<Props> = (props) => {
  const { className } = props
  const { t } = useTranslation()
  const user = useUser()
  const { countryIso } = useCountryRouteParams()
  const cycle = useCycle()

  if (!Users.getRolesAllowedToEdit({ user, countryIso, cycle }).length) return null

  return (
    <Link to={Routes.CountryHomeSectionInvite.path.relative} className={classNames('btn-s', 'btn-primary', className)}>
      <Icon className="icon-sub icon-white" name="small-add" /> {t('userManagement.addUser')}
    </Link>
  )
}

InviteUserLink.defaultProps = {
  className: '',
}

export default InviteUserLink
