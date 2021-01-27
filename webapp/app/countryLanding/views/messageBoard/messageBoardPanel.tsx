import React, { useEffect, useRef } from 'react'
import { connect, useSelector } from 'react-redux'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'ramd... Remove this comment to see the full error message
import * as R from 'ramda'

import Icon from '@webapp/components/icon'
import useI18n from '@webapp/components/hooks/useI18n'

import { getRelativeDate } from '@webapp/utils/relativeDate'
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import { profilePictureUri } from '@common/userUtils'

import * as AppState from '@webapp/store/app/state'
import { UserState } from '@webapp/store/user'
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
      {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ className: string; name: string; }' is not... Remove this comment to see the full error message */}
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
  const countryIso = useSelector(AppState.getCountryIso)

  return (
    <FraReviewFooter
      // @ts-expect-error ts-migrate(2322) FIXME: Type '{ onSubmit: (msg: any) => any; onCancel: () ... Remove this comment to see the full error message
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
  const countryIso = useSelector(AppState.getCountryIso)
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

const mapStateToProps = (state: any) => ({
  showMessageBoard: R.pathEq(['countryMessageBoard', 'show'], true)(state),
  messages: R.path(['countryMessageBoard', 'messages'])(state),
  userInfo: UserState.getUserInfo(state),
})

export default connect(mapStateToProps, {
  closeCountryMessageBoard,
  sendCountryMessageBoard,
  fetchAllCountryMessageBoardMessages,
})(MessageBoardView)
