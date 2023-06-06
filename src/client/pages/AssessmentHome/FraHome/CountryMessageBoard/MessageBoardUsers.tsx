import React from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { ApiEndPoint } from 'meta/api/endpoint'
import { MessageTopicType, Topics } from 'meta/messageCenter'
import { Users } from 'meta/user'

import { useCycle } from 'client/store/assessment'
import { useUsers } from 'client/store/ui/userManagement'
import { useUser } from 'client/store/user'
import { useCountryIso } from 'client/hooks'

import MessageButton from './MessageButton'

const MessageBoardUsers: React.FC = () => {
  const countryIso = useCountryIso()
  const cycle = useCycle()

  const { t } = useTranslation()
  const user = useUser()
  const users = useUsers()

  if (!users || !user) {
    return null
  }

  return (
    <div className="landing__users-container">
      <div className="landing__page-container-header">
        <h3 className="landing__users-container-header">{t('countryMessageBoard.oneToOneMessages')}</h3>
      </div>
      {users.map((_user) => (
        <div key={_user.id} className="landing__user-outer-container">
          <div
            className={classNames('landing__user-container', {
              'user-list__inactive-user': _user.status === 'active',
            })}
          >
            <div className="landing__user-header">
              <img alt="" className="landing__user-avatar" src={ApiEndPoint.User.profilePicture(String(_user.id))} />
              <div className="landing__user-info">
                <div className={classNames('landing__user-name', { 'session-user': user.id === _user.id })}>{Users.getFullName(_user)}</div>
                <div className="landing__user-role">{t(Users.getI18nRoleLabelKey(Users.getRole(_user, countryIso, cycle)?.role))}</div>
                {user.id !== _user.id && (
                  <MessageButton
                    topicKey={Topics.getMessageBoardChatKey(user, _user)}
                    topicSubtitle={t('landing.users.message')}
                    topicTitle={Users.getFullName(_user)}
                    topicType={MessageTopicType.chat}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
export default MessageBoardUsers
