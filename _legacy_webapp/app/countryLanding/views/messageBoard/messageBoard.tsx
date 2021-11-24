import React from 'react'
import { useCountryIso } from '../../../../store/app'
import useI18n from '../../../../hooks/useI18n'
import { useDispatch, useSelector } from 'react-redux'
import * as LandingState from '../../../../app/countryLanding/landingState'
import * as MessageBoardState from '../../../../app/countryLanding/views/messageBoard/messageBoardState'
import { openCountryMessageBoard } from '../../../../app/countryLanding/views/messageBoard/actions'
import { closeChat } from '../../../../app/user/chat/actions'
import Icon from '../../../../components/icon'

const MessageBoard = () => {
  const countryIso = useCountryIso()
  const i18n = useI18n()
  const dispatch = useDispatch()
  const { countryMessageBoardUnreadMessages, countryMessageBoardOpened } = useSelector((state) => ({
    countryMessageBoardUnreadMessages: LandingState.getCountryMessageBoardUnreadMessages(state),
    countryMessageBoardOpened: MessageBoardState.getCountryMessageBoardOpened(state),
  }))
  return (
    <div className="landing__users-container landing__message-board">
      <div className="landing__page-container-header">
        <h3 className="landing__users-container-header">{(i18n as any).t('countryMessageBoard.messageBoard')}</h3>
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
              <div className="landing__user-role">{(i18n as any).t('countryMessageBoard.messageBoardDesc')}</div>
              <button
                type="button"
                className="btn-secondary landing__user-btn-message"
                onClick={() => {
                  if (!countryMessageBoardOpened) {
                    dispatch(openCountryMessageBoard())
                    dispatch(closeChat())
                  }
                }}
              >
                <Icon name="chat-46" className="icon-middle" />
                {(i18n as any).t('landing.users.message')}
                {countryMessageBoardUnreadMessages > 0 ? (
                  <div className="landing__user-message-count">{countryMessageBoardUnreadMessages}</div>
                ) : null}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default MessageBoard
