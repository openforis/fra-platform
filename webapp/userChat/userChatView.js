import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'

import Icon from '../reusableUiComponents/icon'
import VerticallyGrowingTextField from '../reusableUiComponents/verticallyGrowingTextField'

import { closeChat, sendMessage } from './actions'
import { getRelativeDate } from '../utils/relativeDate'

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
    const {i18n, chat} = this.props
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
                     src={`https://www.gravatar.com/avatar/${message.hash}?default=mm`}/>
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
    this.state = {message: ''}
  }

  handleInputChange (evt) {
    this.setState({message: evt.target.value})
  }

  handleKeyDown (evt) {
    if (evt.keyCode === 13 && evt.metaKey) {
      this.handleSendMessage(this.state.message)
    }
  }

  handleSendMessage () {
    const msg = R.prop('message', this.state)
    if (!R.isEmpty(R.trim(msg))) {

      const {countryIso, chat, sendMessage} = this.props
      const {sessionUser, recipientUser} = chat

      sendMessage(countryIso, sessionUser.id, recipientUser.id, msg)

      this.setState({message: ''})
    }
  }

  render () {
    const {i18n, closeChat} = this.props

    return <div className="fra-review__footer">
      <div className="fra-review__footer-input-wrapper">
        <VerticallyGrowingTextField
          onChange={evt => this.handleInputChange(evt)}
          onKeyDown={evt => this.handleKeyDown(evt)}
          value={this.state.message}
          className="fra-review__footer-input"
          placeholder={i18n.t('userChat.writeMessage')}/>
      </div>
      <div className="fra-review__footer-buttons">
        <button className="fra-review__footer-add-btn btn-s btn-primary"
                onClick={() => this.handleSendMessage()}>
          {this.props.i18n.t('userChat.send')}
        </button>
        <button className="btn-s btn-secondary"
                onClick={() => closeChat()}>
          {i18n.t('userChat.cancel')}
        </button>
      </div>
    </div>
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
          <UserChatMessages i18n={i18n} chat={chat}/>
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
