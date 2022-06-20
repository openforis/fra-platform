import React from 'react'
import { useTranslation } from 'react-i18next'

import { useCountryIso } from '@client/hooks'
import Icon from '@client/components/Icon'

const MessageBoard = () => {
  const countryIso = useCountryIso()
  const i18n = useTranslation()
  // const dispatch = useDispatch()

  // const { countryMessageBoardUnreadMessages, countryMessageBoardOpened } = useSelector((state) => ({
  //   countryMessageBoardUnreadMessages: LandingState.getCountryMessageBoardUnreadMessages(state),
  //   countryMessageBoardOpened: MessageBoardState.getCountryMessageBoardOpened(state),
  // }))
  const countryMessageBoardUnreadMessages = 5

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
                  // Todo
                  // if (!countryMessageBoardOpened) {
                  //   dispatch(openCountryMessageBoard())
                  //   dispatch(closeChat())
                  // }
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
