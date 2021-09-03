import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'
import Icon from '@webapp/components/icon'
import useI18n from '@webapp/store/app/hooks/useI18n'
import { getRelativeDate } from '@webapp/utils/relativeDate'
import { profilePictureUri } from '@common/userUtils'
import { useCountryIso } from '@webapp/components/hooks'
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

type UserChatMessagesProps = any
class UserChatMessages extends React.Component<UserChatMessagesProps, {}> {
  props: UserChatMessagesProps

  scrollToBottom() {
    if (this.refs.container) {
      ;(this.refs.container as any).scrollTop = (this.refs.container as any).scrollHeight
    }
  }

  componentDidMount() {
    this.scrollToBottom()
  }

  componentDidUpdate(prevProps: any) {
    // @ts-ignore
    const messages: any[] = R.path(['chat', 'messages'])(this.props)
    // @ts-ignore
    const prevMessages: any[] = R.path(['chat', 'messages'])(prevProps)
    if (messages.length > prevMessages.length) this.scrollToBottom()
  }

  render() {
    const { i18n, chat }: any = this.props
    const { messages, sessionUser, recipientUser } = chat
    const messageUser = (message: any) => (message.fromUser === sessionUser.id ? sessionUser : recipientUser)
    const isSessionUserMessageSender = (message: any) => message.fromUser === sessionUser.id
    return (
      <div ref="container" className="fra-review__comment-thread">
        {R.isEmpty(messages) ? (
          <div className="fra-review__comment-placeholder">
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

type Props = any

class UsersChatAddMessage extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props)
    this.handleSendMessage = this.handleSendMessage.bind(this)
  }

  handleSendMessage(msg: any) {
    const { countryIso, chat, sendMessage } = this.props
    const { sessionUser, recipientUser } = chat
    sendMessage(countryIso, sessionUser.id, recipientUser.id, msg)
  }

  render() {
    const { i18n, chat, closeChat } = this.props
    const { sessionUser, recipientUser } = chat
    const submitAllowed = sessionUser.active && recipientUser.active
    return (
      <FraReviewFooter
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
  const countryIso = useCountryIso()
  const i18n = useI18n()
  if (R.isNil(chat)) {
    return null
  }
  return (
    <div className="fra-review__container">
      <div className="fra-review user-chat">
        <UserChatHeader i18n={i18n} chat={chat} closeChat={closeChat} />
        <UserChatMessages i18n={i18n} chat={chat} />
        <UsersChatAddMessage
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
