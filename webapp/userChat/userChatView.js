import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'

import Icon from '../reusableUiComponents/icon'

import { closeChat } from './actions'

const UserChatHeader = ({i18n, chat, closeChat}) =>
  <div className="fra-review__header">
    <div className="fra-review__header-title">{i18n.t('userChat.chatHeader', {user: chat.toUser})}</div>
    <div className="fra-review__header-close-btn" onClick={() => closeChat()}>
      <Icon name="remove"/>
    </div>
  </div>

class UserChatView extends React.Component {
  render () {
    const {chat, i18n, closeChat} = this.props
    const isActive = !R.isNil(chat)

    console.log(this.props)
    return isActive
      ? <div className="fra-review__container">
        <div className="fra-review">
          <UserChatHeader i18n={i18n} closeChat={closeChat} chat={chat}/>
        </div>
      </div>
      : null
  }
}

const mapStateToProps = state => ({
  ...state.userChat,
  ...state.user
})

export default connect(mapStateToProps, {closeChat})(UserChatView)
