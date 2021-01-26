import React, { useEffect, useRef } from 'react'
import { connect, useSelector } from 'react-redux'
import * as R from 'ramda'

import FraReviewFooter from '../../../assessment/components/review/reviewFooter'
import Icon from '@webapp/components/icon'
import useI18n from '@webapp/components/hooks/useI18n'

import { getRelativeDate } from '@webapp/utils/relativeDate'
import { profilePictureUri } from '@common/userUtils'

import * as AppState from '@webapp/store/app/state'
import { UserState } from '@webapp/store/user'

import { closeCountryMessageBoard, fetchAllCountryMessageBoardMessages, sendCountryMessageBoard, } from './actions'

const MessageBoardHeader = ({ i18n, closeCountryMessageBoard }) =>
  <div className="fra-review__header">
    <div className="fra-review__header-title">{i18n.t('countryMessageBoard.messageBoard')}</div>
    <div className="fra-review__header-close-btn" onClick={() => closeCountryMessageBoard()}>
      <Icon name="remove" />
    </div>
  </div>

const NoMessages = ({ i18n }) =>
  <div className="fra-review__comment-thread">
    <div className='fra-review__comment-placeholder'>
      <Icon className="fra-review__comment-placeholder-icon icon-24" name="chat-46" />
      <span className="fra-review__comment-placeholder-text">{i18n.t('userChat.noMessages')}</span>
    </div>
  </div>

const MessageBoardMessages = props => {
  const { i18n, messages = [], userInfo } = props
  const messageContainerRef = useRef(null)

  useEffect(() => {
    const messageContainerEl = messageContainerRef.current
    if (messageContainerEl) {
      messageContainerEl.scrollTop = messageContainerEl.scrollHeight
    }
  }, [messages])


  if (R.isEmpty(messages)) {
    return <NoMessages i18n={i18n} />
  }

  return <div ref={messageContainerRef} className="fra-review__comment-thread">
    {
      messages.map((message, i) =>
        <div key={i} className={`fra-review__comment`}>
          <div className="fra-review__comment-header">
            <img className="fra-review__comment-avatar"
              src={profilePictureUri(message.fromUserId)} />
            <div className="fra-review__comment-author-section">
              <div
                className={`fra-review__comment-author ${userInfo.id === message.fromUserId ? 'author-me' : ''}`}>
                {message.fromUserName}
              </div>

              <div className="fra-review__comment-time">
                {(getRelativeDate(message.time, i18n) || i18n.t('time.aMomentAgo'))}
              </div>
            </div>
          </div>
          <div className="fra-review__comment-text">
            {message.text.split('\n').map((item, key) =>
              <span key={key}>{item}<br /></span>
            )}
          </div>
        </div>
      )
    }
  </div>
}

const MessageBoardAddMessage = props => {
  const {
    closeCountryMessageBoard,
    i18n,
    sendCountryMessageBoard,
    userInfo,
  } = props
  const countryIso = useSelector(AppState.getCountryIso)

  return <FraReviewFooter
    onSubmit={(msg) => sendCountryMessageBoard(countryIso, msg, userInfo.id, userInfo.name)}
    onCancel={() => closeCountryMessageBoard()}
    placeholder={i18n.t('userChat.writeMessage')}
    i18n={i18n}
    submitBtnLabel={i18n.t('userChat.send')}
    cancelBtnLabel={i18n.t('userChat.cancel')}
  />
}

const MessageBoardView = props => {

  const {
    fetchAllCountryMessageBoardMessages, showMessageBoard
  } = props
  const countryIso = useSelector(AppState.getCountryIso)
  const i18n = useI18n()

  useEffect(() => {
    if (showMessageBoard) {
      fetchAllCountryMessageBoardMessages(countryIso)
    }
  }, [showMessageBoard, countryIso])

  return showMessageBoard && (
    <div className="fra-review__container">
      <div className="fra-review user-chat">
        <MessageBoardHeader {...props} i18n={i18n} />
        <MessageBoardMessages {...props} i18n={i18n} />
        <MessageBoardAddMessage {...props} i18n={i18n} />
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  showMessageBoard: R.pathEq(['countryMessageBoard', 'show'], true)(state),
  messages: R.path(['countryMessageBoard', 'messages'])(state),
  userInfo: UserState.getUserInfo(state),
})

export default connect(
  mapStateToProps,
  { closeCountryMessageBoard, sendCountryMessageBoard, fetchAllCountryMessageBoardMessages }
)(MessageBoardView)
