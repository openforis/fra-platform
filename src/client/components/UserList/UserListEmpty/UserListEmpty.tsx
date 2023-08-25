import React from 'react'
import { useTranslation } from 'react-i18next'

import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import InviteUserLink from 'client/components/UserList/InviteUserLink'

const UserListEmpty: React.FC = () => {
  const { t } = useTranslation()
  const { countryIso } = useCountryRouteParams()

  return (
    <div className="landing__users-container">
      <div className="landing__user-outer-container">
        <div className="landing__user-container">
          <div className="landing__user-header">
            <img
              alt=""
              className="landing__user-avatar"
              style={{
                backgroundImage: `url('/img/flags/1x1/${countryIso}.svg'), url('/img/flags/1x1/ATL.svg')`,
                backgroundSize: 'cover',
              }}
            />
            <div className="landing__user-info">
              <div className="landing__user-role">
                {t('userManagement.noUsers')}
                <div className="btn-message">
                  <InviteUserLink />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserListEmpty
