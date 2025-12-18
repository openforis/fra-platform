import React from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate } from 'react-router'

import { Routes } from 'meta/routes/routes'
import { UserInvitations } from 'meta/user/invitations'

import { useUser } from 'client/store/user/hooks/user'
import Accept from 'client/pages/Authentication/Invitation/Accept'
import { useData } from 'client/pages/Authentication/Invitation/hooks/useData'
import Register from 'client/pages/Authentication/Invitation/Register'

const Invitation: React.FC = () => {
  const { t } = useTranslation()
  const user = useUser()
  const data = useData()

  if (!data) return null

  const { assessmentName, cycleName, userInvitation } = data

  // If the invitation has been accepted...
  if (userInvitation.acceptedAt) {
    // ...and the user is already logged in, redirect to root
    if (user) {
      return <Navigate replace to={Routes.Root.generatePath()} />
    }
    // and the user is not logged in, redirect to login
    return <Navigate replace to={Routes.Login.generatePath({ assessmentName, cycleName })} />
  }

  // If the invitation is expired, show error message
  if (UserInvitations.isExpired(userInvitation)) {
    return (
      <div className="login-form">
        <h3>{t('login.invitationExpired')}</h3>
      </div>
    )
  }

  // If the user is not logged in,
  // or the user is logged in with a different account than invited
  if (!user || data.user.uuid !== user.uuid) return <Register />

  return <Accept data={data} />
}

export default Invitation
