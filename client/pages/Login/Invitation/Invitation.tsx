import React, { useEffect, useState } from 'react'

import { UserRepository } from '@server/repository'
import { Urls } from '@client/utils'
import { useUser } from '@client/store/user'
import { useTranslation } from 'react-i18next'
import { User } from '@meta/user'

const Invitation: React.FC = () => {
  const invitation = Urls.getRequestParam('invitation')
  const loggedUser = useUser()
  const { i18n } = useTranslation()

  const [invitedUser, setInvitedUser] = useState<User>()

  useEffect(() => {
    async function fetchUser(email: string) {
      const response = await UserRepository.read({ user: { email } })
      setInvitedUser(response)
    }
    if (invitation && loggedUser) {
      fetchUser(loggedUser.email)
    }
  }, [])

  const onAccept = () => 'not implemented'

  return (
    <div className="login__form">
      {!invitation ? (
        <div>{i18n.t('login.missingInvitationUuid')}</div>
      ) : (
        <>
          {loggedUser && invitedUser && loggedUser.email === invitedUser.email ? (
            <button type="button" className="btn" onClick={onAccept}>
              {i18n.t('login.acceptInvitation')}
            </button>
          ) : (
            <button type="button" className="btn" onClick={onAccept}>
              {i18n.t('login.acceptInvitationWithGoogle')}
            </button>
          )}
        </>
      )}
    </div>
  )
}

export default Invitation
