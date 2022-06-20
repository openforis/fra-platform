import React from 'react'
import { useTranslation } from 'react-i18next'

import { User } from '@meta/user'

import { useUser } from '@client/store/user'
import Icon from '@client/components/Icon'

const profilePictureUri = (_: any) => '#'
const i18nUserRole = (_: any, __: any) => 'todo'

const MessageBoardUsers = () => {
  const i18n = useTranslation()
  const user = useUser()
  const users: Array<User & { active: boolean; chat: Record<string, any>; role: any }> = [user as any]

  if (!users || !user) {
    return null
  }

  return (
    <div className="landing__users-container">
      <div className="landing__page-container-header">
        <h3 className="landing__users-container-header">{i18n.t<string>('countryMessageBoard.oneToOneMessages')}</h3>
      </div>
      {users.map((_user) => (
        <div key={_user.id} className="landing__user-outer-container">
          <div className={`landing__user-container${_user.active ? '' : ' user-list__inactive-user'}`}>
            <div className="landing__user-header">
              <img alt="" className="landing__user-avatar" src={profilePictureUri(_user.id)} />
              <div className="landing__user-info">
                <div className={`landing__user-name${user.id === _user.id ? ' session-user' : ''}`}>{_user.name}</div>
                <div className="landing__user-role">{i18nUserRole(i18n, _user.role)}</div>
                {
                  // add message button if session user is not equal to current displayed user
                  user.id !== _user.id ? (
                    <button
                      type="button"
                      className="btn-secondary landing__user-btn-message"
                      onClick={() => {
                        // dispatch(closeCountryMessageBoard())
                        // dispatch(openChat(countryIso, userInfo, user))
                      }}
                    >
                      <Icon name="chat-46" className="icon-middle" />
                      {i18n.t<string>('landing.users.message')}
                      {_user.chat.unreadMessages > 0 ? (
                        <div className="landing__user-message-count">{_user.chat.unreadMessages}</div>
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
export default MessageBoardUsers
