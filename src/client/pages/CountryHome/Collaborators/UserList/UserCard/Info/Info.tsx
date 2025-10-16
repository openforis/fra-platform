import './Info.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { CountryIso } from 'meta/area'
import { UserInvitations } from 'meta/user'
import { CountryUserSummaries } from 'meta/user/countryUserSummaries'

import { useCountryRouteParams } from 'client/hooks/routeParams'

import type { Props } from '../Props'

const Info: React.FC<Props> = (props: Props) => {
  const { user } = props
  const { t } = useTranslation()
  const { countryIso } = useCountryRouteParams<CountryIso>()

  const { invitation } = CountryUserSummaries.getCountryRoleAndInvitation(user, countryIso)
  const isInvitation = CountryUserSummaries.isInvitation(user, countryIso)
  const expired = invitation && UserInvitations.isExpired(invitation)

  return (
    <div className={classNames('home-user-info', { expired })}>
      <div className="home-user-name">
        <div className="name">{user.fullName}</div>

        {isInvitation && (
          <div className={classNames('invitation-badge', { expired })}>
            {expired ? t('common.expired') : t('common.pending')}
          </div>
        )}
      </div>
    </div>
  )
}

export default Info
