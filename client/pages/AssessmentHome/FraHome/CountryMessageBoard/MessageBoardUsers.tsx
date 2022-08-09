import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { ApiEndPoint } from '@common/api/endpoint'
import classNames from 'classnames'

import { MessageTopicType, Topics } from '@meta/messageCenter'
import { Users } from '@meta/user'

import { useAppDispatch } from '@client/store'
import { useAssessment, useCycle } from '@client/store/assessment'
import { MessageCenterActions } from '@client/store/ui/messageCenter'
import { useUser } from '@client/store/user'
import { useUsers } from '@client/store/userManagement/hooks'
import { useCountryIso, useGetRequest } from '@client/hooks'
import Icon from '@client/components/Icon'

const MessageBoardUsers = () => {
  const countryIso = useCountryIso()
  const assessment = useAssessment()
  const cycle = useCycle()

  const i18n = useTranslation()
  const dispatch = useAppDispatch()
  const user = useUser()
  const users = useUsers()

  const { data: usersUnreadMessages = {}, dispatch: fetchData } = useGetRequest(
    ApiEndPoint.MessageCenter.Stats.getUnreadChatMessages(),
    {
      params: { countryIso, assessmentName: assessment.props.name, cycleName: cycle.name },
    }
  )

  const fetchRef = useRef(fetchData)

  useEffect(() => fetchRef.current(), [fetchRef])

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
          <div
            className={classNames('landing__user-container', {
              'user-list__inactive-user': _user.status === 'active',
            })}
          >
            <div className="landing__user-header">
              <img alt="" className="landing__user-avatar" src={ApiEndPoint.User.getProfilePicture(String(_user.id))} />
              <div className="landing__user-info">
                <div className={`landing__user-name${user.id === _user.id ? ' session-user' : ''}`}>{_user.name}</div>
                <div className="landing__user-role">
                  {i18n.t<string>(Users.getI18nRoleLabelKey(Users.getCountryRole(_user, countryIso).role))}
                </div>
                {user.id !== _user.id && (
                  <button
                    type="button"
                    className="btn-secondary landing__user-btn-message"
                    onClick={() => {
                      dispatch(
                        MessageCenterActions.openTopic({
                          countryIso,
                          assessmentName: assessment.props.name,
                          cycleName: cycle.name,
                          key: Topics.getMessageBoardChatKey(user, _user),
                          type: MessageTopicType.chat,
                          subtitle: i18n.t<string>('landing.users.message'),
                          title: _user.name,
                        })
                      )
                    }}
                  >
                    <Icon name="chat-46" className="icon-middle" />
                    {i18n.t<string>('landing.users.message')}
                    {usersUnreadMessages[_user.id] > 0 && (
                      <div className="landing__user-message-count">{usersUnreadMessages[_user.id]}</div>
                    )}
                  </button>
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
