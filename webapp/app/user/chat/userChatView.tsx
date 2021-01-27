import React from 'react'
import { connect, useSelector } from 'react-redux'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'ramd... Remove this comment to see the full error message
import * as R from 'ramda'
import Icon from '@webapp/components/icon'
import useI18n from '@webapp/components/hooks/useI18n'
import { getRelativeDate } from '@webapp/utils/relativeDate'
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import { profilePictureUri } from '@common/userUtils'
import * as AppState from '@webapp/store/app/state'
import { closeChat, sendMessage } from './actions'
import FraReviewFooter from '../../assessment/components/review/reviewFooter'

const UserChatHeader = ({ i18n, chat, closeChat }: any) => (
  <div className="fra-review__header">
    <div className="fra-review__header-title">{i18n.t('userChat.chatHeader', { user: chat.recipientUser.name })}</div>
    <div className="fra-review__header-close-btn" onClick={() => closeChat()}>
      <Icon name="remove" />
    </div>
  </div>
)
class UserChatMessages extends React.Component {
  scrollToBottom() {
    if (this.refs.container) {
      ;(this.refs.container as any).scrollTop = (this.refs.container as any).scrollHeight
    }
  }

  componentDidMount() {
    this.scrollToBottom()
  }

  componentDidUpdate(prevProps: any) {
    const messages = R.path(['chat', 'messages'])(this.props)
    const prevMessages = R.path(['chat', 'messages'])(prevProps)
    if (messages.length > prevMessages.length) this.scrollToBottom()
  }

  render() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'i18n' does not exist on type 'Readonly<{... Remove this comment to see the full error message
    const { i18n, chat } = this.props
    const { messages, sessionUser, recipientUser } = chat
    const messageUser = (message: any) => (message.fromUser === sessionUser.id ? sessionUser : recipientUser)
    const isSessionUserMessageSender = (message: any) => message.fromUser === sessionUser.id
    return (
      <div ref="container" className="fra-review__comment-thread">
        {R.isEmpty(messages) ? (
          <div className="fra-review__comment-placeholder">
            {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ className: string; name: string; }' is not... Remove this comment to see the full error message */}
            <Icon className="fra-review__comment-placeholder-icon icon-24" name="chat-46" />
            <span className="fra-review__comment-placeholder-text">{i18n.t('userChat.noMessages')}</span>
          </div>
        ) : (
          messages.map((message: any, i: any) => (
            <div key={i} className="fra-review__comment">
              <div className="fra-review__comment-header">
                <img className="fra-review__comment-avatar" src={profilePictureUri(messageUser(message).id)} />
                <div className="fra-review__comment-author-section">
                  <div
                    className={`fra-review__comment-author ${isSessionUserMessageSender(message) ? 'author-me' : ''}`}
                  >
                    {messageUser(message).name}
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
          ))
        )}
      </div>
    )
  }
}
class UsersChatAddMessage extends React.Component {
  constructor() {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1-2 arguments, but got 0.
    super()
    this.handleSendMessage = this.handleSendMessage.bind(this)
  }

  handleSendMessage(msg: any) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'countryIso' does not exist on type 'Read... Remove this comment to see the full error message
    const { countryIso, chat, sendMessage } = this.props
    const { sessionUser, recipientUser } = chat
    sendMessage(countryIso, sessionUser.id, recipientUser.id, msg)
  }

  render() {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'i18n' does not exist on type 'Readonly<{... Remove this comment to see the full error message
    const { i18n, chat, closeChat } = this.props
    const { sessionUser, recipientUser } = chat
    const submitAllowed = sessionUser.active && recipientUser.active
    return (
      <FraReviewFooter
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ onSubmit: (msg: any) => void; onCancel: ()... Remove this comment to see the full error message
        onSubmit={this.handleSendMessage}
        onCancel={() => closeChat()}
        placeholder={i18n.t('userChat.writeMessage')}
        i18n={i18n}
        submitBtnLabel={i18n.t('userChat.send')}
        cancelBtnLabel={i18n.t('userChat.cancel')}
        submitAllowed={submitAllowed}
      />
    )
  }
}
const UserChatView = (props: any) => {
  const { chat, closeChat, sendMessage } = props
  const countryIso = useSelector(AppState.getCountryIso)
  const i18n = useI18n()
  if (R.isNil(chat)) {
    return null
  }
  return (
    <div className="fra-review__container">
      <div className="fra-review user-chat">
        <UserChatHeader i18n={i18n} chat={chat} closeChat={closeChat} />
        {/* @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call. */}
        <UserChatMessages i18n={i18n} chat={chat} />
        <UsersChatAddMessage
          // @ts-expect-error ts-migrate(2322) FIXME: Type '{ i18n: unknown; chat: any; closeChat: any; ... Remove this comment to see the full error message
          i18n={i18n}
          chat={chat}
          closeChat={closeChat}
          sendMessage={sendMessage}
          countryIso={countryIso}
        />
      </div>
    </div>
  )
}
const mapStateToProps = (state: any) => ({
  ...state.userChat,
})
export default connect(mapStateToProps, { closeChat, sendMessage })(UserChatView)
