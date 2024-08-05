import React from 'react'
import { useTranslation } from 'react-i18next'

import { Areas } from 'meta/area'
import { MessageTopicType, Topics } from 'meta/messageCenter'

import { useCountryIso } from 'client/hooks'

import MessageButton from './MessageButton'

const MessageBoard: React.FC = () => {
  const countryIso = useCountryIso()

  const i18n = useTranslation()

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
              className="landing__user-avatar country"
              style={{ backgroundImage: Areas.getCountryBackgroundImg(countryIso), backgroundSize: 'cover' }}
            />
            <div className="landing__user-info">
              <div className="landing__user-role">{i18n.t<string>('countryMessageBoard.messageBoardDesc')}</div>
              <MessageButton
                topicKey={Topics.getMessageBoardCountryKey()}
                topicTitle={i18n.t<string>(Areas.getTranslationKey(countryIso))}
                topicType={MessageTopicType.messageBoard}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default MessageBoard
