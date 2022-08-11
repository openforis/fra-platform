import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { ApiEndPoint } from '@common/api/endpoint'

import { Areas } from '@meta/area'
import { MessageTopicType, Topics } from '@meta/messageCenter'

import { useAppDispatch } from '@client/store'
import { useAssessment, useCycle } from '@client/store/assessment'
import { MessageCenterActions } from '@client/store/ui/messageCenter'
import { useCountryIso, useGetRequest } from '@client/hooks'
import Icon from '@client/components/Icon'

const MessageBoard: React.FC = () => {
  const countryIso = useCountryIso()
  const assessment = useAssessment()
  const cycle = useCycle()

  const i18n = useTranslation()
  const dispatch = useAppDispatch()

  const { data: unreadMessages = {}, dispatch: fetchData } = useGetRequest(
    ApiEndPoint.MessageCenter.Topic.getUnreadMessages(),
    {
      params: {
        countryIso,
        assessmentName: assessment.props.name,
        cycleName: cycle.name,
        type: MessageTopicType.messageBoard,
      },
    }
  )

  const fetchRef = useRef(fetchData)

  useEffect(() => fetchRef.current(), [fetchRef])

  const topicKey = Topics.getMessageBoardCountryKey()

  return (
    <div className="landing__users-container landing__message-board">
      <div className="landing__page-container-header">
        <h3 className="landing__users-container-header">{i18n.t<string>('countryMessageBoard.messageBoard')}</h3>
      </div>
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
              <div className="landing__user-role">{i18n.t<string>('countryMessageBoard.messageBoardDesc')}</div>
              <button
                type="button"
                className="btn-secondary landing__user-btn-message"
                onClick={() => {
                  dispatch(
                    MessageCenterActions.openTopic({
                      countryIso,
                      assessmentName: assessment.props.name,
                      cycleName: cycle.name,
                      key: topicKey,
                      type: MessageTopicType.messageBoard,
                      title: i18n.t<string>(Areas.getTranslationKey(countryIso)),
                    })
                  )
                }}
              >
                <Icon name="chat-46" className="icon-middle" />
                {i18n.t<string>('landing.users.message')}
                {unreadMessages[topicKey] > 0 && (
                  <div className="landing__user-message-count">{unreadMessages[topicKey]}</div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default MessageBoard
