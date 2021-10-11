import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'

import Icon from '@webapp/components/icon'
import useI18n from '@webapp/hooks/useI18n'

import { getRelativeDate } from '@webapp/utils/relativeDate'
import { profilePictureUri } from '@common/userUtils'

import { useCountryIso } from '@webapp/hooks'
import { RootState } from '@webapp/store/RootState'
import FraReviewFooter from '../../../assessment/components/review/reviewFooter'

import { closeCountryMessageBoard, fetchAllCountryMessageBoardMessages, sendCountryMessageBoard } from './actions'

const MessageBoardHeader = ({ i18n, closeCountryMessageBoard }: any) => (
  <div className="fra-review__header">
    <div className="fra-review__header-title">{i18n.t('countryMessageBoard.messageBoard')}</div>
    <div className="fra-review__header-close-btn" onClick={() => closeCountryMessageBoard()}>
      <Icon name="remove" />
    </div>
  </div>
)

const NoMessages = ({ i18n }: any) => (
  <div className="fra-review__comment-thread">
    <div className="fra-review__comment-placeholder">
      <Icon className="fra-review__comment-placeholder-icon icon-24" name="chat-46" />
      <span className="fra-review__comment-placeholder-text">{i18n.t('userChat.noMessages')}</span>
    </div>
  </div>
)

const MessageBoardMessages = (props: any) => {
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

  return (
    <div ref={messageContainerRef} className="fra-review__comment-thread">
      {messages.map((message: any, i: any) => (
        <div key={i} className="fra-review__comment">
          <div className="fra-review__comment-header">
            <img className="fra-review__comment-avatar" src={profilePictureUri(message.fromUserId)} />
            <div className="fra-review__comment-author-section">
              <div className={`fra-review__comment-author ${userInfo.id === message.fromUserId ? 'author-me' : ''}`}>
                {message.fromUserName}
              </div>

              <div className="fra-review__comment-time">
                {getRelativeDate(message.time, i18n) || i18n.t('time.aMomentAgo')}
              </div>
            </div>
          </div>
          <div className="fra-review__comment-text">
            {message.text.split('\n').map((item: any, key: any) => (
              <span key={key}>
                {item}
                <br />
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

const MessageBoardAddMessage = (props: any) => {
  const { closeCountryMessageBoard, i18n, sendCountryMessageBoard, userInfo } = props
  const countryIso = useCountryIso()
  return (
    <FraReviewFooter
      onSubmit={(msg: any) => sendCountryMessageBoard(countryIso, msg, userInfo.id, userInfo.name)}
      onCancel={() => closeCountryMessageBoard()}
      placeholder={i18n.t('userChat.writeMessage')}
      i18n={i18n}
      submitBtnLabel={i18n.t('userChat.send')}
      cancelBtnLabel={i18n.t('userChat.cancel')}
    />
  )
}

const MessageBoardView = (props: any) => {
  const { fetchAllCountryMessageBoardMessages, showMessageBoard } = props
  const countryIso = useCountryIso()
  const i18n = useI18n()

  useEffect(() => {
    if (showMessageBoard) {
      fetchAllCountryMessageBoardMessages(countryIso)
    }
  }, [showMessageBoard, countryIso])

  return (
    showMessageBoard && (
      <div className="fra-review__container">
        <div className="fra-review user-chat">
          <MessageBoardHeader {...props} i18n={i18n} />
          <MessageBoardMessages {...props} i18n={i18n} />
          <MessageBoardAddMessage {...props} i18n={i18n} />
        </div>
      </div>
    )
  )
}

// TODO: Refactor: Remove mapStateToProps
const mapStateToProps = (state: RootState | any) => ({
  showMessageBoard: R.pathEq(['countryMessageBoard', 'show'], true)(state),
  messages: R.path(['countryMessageBoard', 'messages'])(state),
  userInfo: state.user,
})

export default connect(mapStateToProps, {
  closeCountryMessageBoard,
  sendCountryMessageBoard,
  fetchAllCountryMessageBoardMessages,
})(MessageBoardView)
