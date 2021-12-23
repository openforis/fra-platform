import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@client/store'
import { LoginActions } from '@client/store/login'
import { Urls } from '@client/utils'
import { useUser } from '@client/store/user'
import { useTranslation } from 'react-i18next'

import { Objects } from '@core/utils'
import { BasePaths } from '@client/basePaths'

const Invitation: React.FC = () => {
  const dispatch = useAppDispatch()
  const history = useHistory()
  const invitedUser = useAppSelector((state) => state.login.invitedUser)
  const invitation = Urls.getRequestParam('invitation')
  const loggedUser = useUser()

  const { i18n } = useTranslation()

  useEffect(() => {
    if (invitation) {
      dispatch(LoginActions.fetchUserByInvitation(invitation))
    }
  }, [])

  const onAccept = () => {
    dispatch(LoginActions.acceptInvitation(invitation))
    history.push(BasePaths.Root())
  }

  if (Objects.isEmpty(invitation)) {
    return (
      <div className="login__form">
        <div>{i18n.t('login.missingInvitationUuid')}</div>
      </div>
    )
  }

  return (
    <div className="login__form">
      {loggedUser && invitedUser && loggedUser.email === invitedUser.email ? (
        <button type="button" className="btn" onClick={onAccept}>
          {i18n.t('login.acceptInvitation')}
        </button>
      ) : (
        <>
          <button type="button" className="btn" onClick={onAccept}>
            {i18n.t('login.acceptInvitationWithGoogle')}
          </button>
        </>
      )}
    </div>
  )
}

export default Invitation
