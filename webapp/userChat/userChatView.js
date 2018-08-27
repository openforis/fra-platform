import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'

import FraReviewFooter from '../review/reviewFooter'
import Icon from '../reusableUiComponents/icon'

import { closeChat, sendMessage } from './actions'

import { getRelativeDate } from '../utils/relativeDate'
import { profilePictureUri } from '../../common/userUtils'

const UserChatHeader = ({i18n, chat, closeChat}) =>
  <div className="fra-review__header">
    <div className="fra-review__header-title">{i18n.t('userChat.chatHeader', {user: chat.recipientUser.name})}</div>
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

  componentDidUpdate () {
    this.scrollToBottom()
  }

  render () {
    const {i18n, chat, countryIso} = this.props
    const {messages, sessionUser, recipientUser} = chat

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
                     src={profilePictureUri(countryIso, messageUser(message).id)}/>
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
    const {countryIso, chat, sendMessage} = this.props
    const {sessionUser, recipientUser} = chat

    sendMessage(countryIso, sessionUser.id, recipientUser.id, msg)
  }

  render () {
    const {i18n, chat, closeChat} = this.props

    const {sessionUser, recipientUser} = chat
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

class UserChatView extends React.Component {
  render () {
    const {chat, i18n, closeChat, sendMessage, countryIso} = this.props

    return R.isNil(chat)
      ? null
      : <div className="fra-review__container">
        <div className="fra-review user-chat">
          <UserChatHeader i18n={i18n} chat={chat} closeChat={closeChat}/>
          <UserChatMessages i18n={i18n} chat={chat} countryIso={countryIso}/>
          <UsersChatAddMessage i18n={i18n} chat={chat} closeChat={closeChat} sendMessage={sendMessage}
                               countryIso={countryIso}/>
        </div>
      </div>
  }
}

const mapStateToProps = state => ({
  ...state.userChat,
  ...state.user,
  countryIso: R.path(['router', 'country'], state)
})

export default connect(mapStateToProps, {closeChat, sendMessage})(UserChatView)
