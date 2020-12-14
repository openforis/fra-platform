import React from 'react'
import { connect, useSelector } from 'react-redux'
import * as R from 'ramda'

import FraReviewFooter from '../../assessment/components/review/reviewFooter'
import Icon from '@webapp/components/icon'
import useI18n from '@webapp/components/hooks/useI18n'

import { closeChat, sendMessage } from './actions'

import { getRelativeDate } from '@webapp/utils/relativeDate'
import { profilePictureUri } from '@common/userUtils'
import * as AppState from '@webapp/app/appState'

const UserChatHeader = ({ i18n, chat, closeChat }) =>
  <div className="fra-review__header">
    <div className="fra-review__header-title">{i18n.t('userChat.chatHeader', { user: chat.recipientUser.name })}</div>
    <div className="fra-review__header-close-btn" onClick={() => closeChat()}>
      <Icon name="remove"/>
    </div>
  </div>

class UserChatMessages extends React.Component {

  scrollToBottom () {
    if (this.refs.container) {
      this.refs.container.scrollTop = this.refs.container.scrollHeight
    }
  }

  componentDidMount () {
    this.scrollToBottom()
  }

  componentDidUpdate (prevProps) {
    const messages = R.path(['chat', 'messages'])(this.props)
    const prevMessages = R.path(['chat', 'messages'])(prevProps)

    if (messages.length > prevMessages.length)
      this.scrollToBottom()
  }

  render () {
    const { i18n, chat, countryIso } = this.props
    const { messages, sessionUser, recipientUser } = chat

    const messageUser = message =>
      message.fromUser === sessionUser.id
        ? sessionUser
        : recipientUser

    const isSessionUserMessageSender = message => message.fromUser === sessionUser.id

    return <div ref="container" className="fra-review__comment-thread">
      {
        R.isEmpty(messages)
          ? <div className='fra-review__comment-placeholder'>
            <Icon className="fra-review__comment-placeholder-icon icon-24" name="chat-46"/>
            <span className="fra-review__comment-placeholder-text">{i18n.t('userChat.noMessages')}</span>
          </div>
          : messages.map((message, i) =>
            <div key={i} className={`fra-review__comment`}>
              <div className="fra-review__comment-header">
                <img className="fra-review__comment-avatar"
                     src={profilePictureUri(messageUser(message).id)}/>
                <div className="fra-review__comment-author-section">
                  <div className={`fra-review__comment-author ${isSessionUserMessageSender(message) ? 'author-me' : ''}`}>
                    {messageUser(message).name}
                  </div>

                  <div className="fra-review__comment-time">
                    {(getRelativeDate(message.time, i18n) || i18n.t('time.aMomentAgo'))}
                  </div>
                </div>
              </div>
              <div className="fra-review__comment-text">
                {message.text.split('\n').map((item, key) =>
                  <span key={key}>{item}<br/></span>
                )}
              </div>
            </div>
          )
      }
    </div>
  }

}

class UsersChatAddMessage extends React.Component {

  constructor () {
    super()
    this.handleSendMessage = this.handleSendMessage.bind(this)
  }

  handleSendMessage (msg) {
    const { countryIso, chat, sendMessage } = this.props
    const { sessionUser, recipientUser } = chat

    sendMessage(countryIso, sessionUser.id, recipientUser.id, msg)
  }

  render () {
    const { i18n, chat, closeChat } = this.props

    const { sessionUser, recipientUser } = chat
    const submitAllowed = sessionUser.active && recipientUser.active

    return <FraReviewFooter
      onSubmit={this.handleSendMessage}
      onCancel={() => closeChat()}
      placeholder={i18n.t('userChat.writeMessage')}
      i18n={i18n}
      submitBtnLabel={i18n.t('userChat.send')}
      cancelBtnLabel={i18n.t('userChat.cancel')}
      submitAllowed={submitAllowed}
    />

  }
}

const UserChatView = props => {
  const { chat, closeChat, sendMessage } = props
  const countryIso = useSelector(AppState.getCountryIso)
  const i18n = useI18n()

  if (R.isNil(chat)) {
    return null
  }

  return (
    <div className="fra-review__container">
      <div className="fra-review user-chat">
        <UserChatHeader i18n={i18n} chat={chat} closeChat={closeChat}/>
        <UserChatMessages i18n={i18n} chat={chat} countryIso={countryIso}/>
        <UsersChatAddMessage i18n={i18n} chat={chat} closeChat={closeChat} sendMessage={sendMessage}
                             countryIso={countryIso}/>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  ...state.userChat,
})

export default connect(mapStateToProps, { closeChat, sendMessage })(UserChatView)
