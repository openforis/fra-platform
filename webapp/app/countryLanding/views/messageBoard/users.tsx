import React from 'react'
import { useCountryIso } from '@webapp/components/hooks'
import useI18n from '@webapp/components/hooks/useI18n'
import { useDispatch, useSelector } from 'react-redux'
import * as LandingState from '@webapp/app/countryLanding/landingState'
import { i18nUserRole, profilePictureUri } from '@common/userUtils'
import Icon from '@webapp/components/icon'
import { UserState } from '@webapp/store/user'
import { openChat } from '@webapp/app/user/chat/actions'
import { closeCountryMessageBoard } from '@webapp/app/countryLanding/views/messageBoard/actions'

const Users = () => {
  const countryIso = useCountryIso()
  const i18n = useI18n()
  const dispatch = useDispatch()
  const { userInfo, users }: any = useSelector((state) => ({
    userInfo: UserState.getUserInfo(state),
    users: LandingState.getUsers(state),
  }))
  if (!users || !userInfo) {
    return null
  }
  return (
    <div className="landing__users-container">
      <div className="landing__page-container-header">
        <h3 className="landing__users-container-header">{(i18n as any).t('countryMessageBoard.oneToOneMessages')}</h3>
      </div>
      {users.map((user: any) => (
        <div key={user.id} className="landing__user-outer-container">
          <div className={`landing__user-container${user.active ? '' : ' user-list__inactive-user'}`}>
            <div className="landing__user-header">
              <img alt="" className="landing__user-avatar" src={profilePictureUri(user.id)} />
              <div className="landing__user-info">
                <div className={`landing__user-name${userInfo.id === user.id ? ' session-user' : ''}`}>{user.name}</div>
                <div className="landing__user-role">{i18nUserRole(i18n, user.role)}</div>
                {
                  // add message button if session user is not equal to current displayed user
                  userInfo.id !== user.id ? (
                    <button
                      type="button"
                      className="btn-secondary landing__user-btn-message"
                      onClick={() => {
                        dispatch(closeCountryMessageBoard())
                        dispatch(openChat(countryIso, userInfo, user))
                      }}
                    >
                      <Icon name="chat-46" className="icon-middle" />
                      {(i18n as any).t('landing.users.message')}
                      {user.chat.unreadMessages > 0 ? (
                        <div className="landing__user-message-count">{user.chat.unreadMessages}</div>
                      ) : null}
                    </button>
                  ) : null
                }
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
export default Users
