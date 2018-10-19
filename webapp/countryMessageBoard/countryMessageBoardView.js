import React from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'

import FraReviewFooter from '../review/reviewFooter'
import Icon from '../reusableUiComponents/icon'

import { getRelativeDate } from '../utils/relativeDate'
import { profilePictureUri } from '../../common/userUtils'

import {
  closeCountryMessageBoard
} from './actions'

const MessageBoardHeader = ({i18n, closeCountryMessageBoard}) =>
  <div className="fra-review__header">
    <div className="fra-review__header-title">{i18n.t('countryMessageBoard.messageBoard')}</div>
    <div className="fra-review__header-close-btn" onClick={() => closeCountryMessageBoard()}>
      <Icon name="remove"/>
    </div>
  </div>

class MessageBoardMessages extends React.Component {

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
    const {i18n, messages = [], countryIso, userInfo} = this.props

    return <div ref="container" className="fra-review__comment-thread">
      {
        R.isEmpty(messages)
          ? (
            <div className='fra-review__comment-placeholder'>
              <Icon className="fra-review__comment-placeholder-icon icon-24" name="chat-46"/>
              <span className="fra-review__comment-placeholder-text">{i18n.t('userChat.noMessages')}</span>
            </div>
          )
          : (
            messages.map((message, i) =>
              <div key={i} className={`fra-review__comment`}>
                <div className="fra-review__comment-header">
                  <img className="fra-review__comment-avatar"
                       src={profilePictureUri(countryIso, message.fromUserId)}/>
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
                    <span key={key}>{item}<br/></span>
                  )}
                </div>
              </div>
            )
          )
      }
    </div>
  }

}

class MessageBoardAddMessage extends React.Component {

  handleSendMessage (msg) {
    const {countryIso, userInfo, sendCountryMessageBoard} = this.props

    sendCountryMessageBoard(countryIso, userInfo.id, msg)
  }

  render () {
    const {i18n, closeCountryMessageBoard} = this.props

    return <FraReviewFooter
      onSubmit={this.handleSendMessage.bind(this)}
      onCancel={() => closeCountryMessageBoard()}
      placeholder={i18n.t('userChat.writeMessage')}
      i18n={i18n}
      submitBtnLabel={i18n.t('userChat.send')}
      cancelBtnLabel={i18n.t('userChat.cancel')}
    />

  }
}

class MessageBoardView extends React.Component {

  componentDidMount () {
    console.log('componentDidMount')
  }

  render () {

    const {showMessageBoard} = this.props

    return showMessageBoard
      ? <div className="fra-review__container">
        <div className="fra-review user-chat">
          <MessageBoardHeader {...this.props}/>
          <MessageBoardMessages {...this.props}/>
          <MessageBoardAddMessage {...this.props}/>
        </div>
      </div>
      : null
  }
}

const mapStateToProps = state => console.log(state.countryMessageBoard)|| ({
  showMessageBoard: R.pathEq(['countryMessageBoard', 'show'], true)(state),
  ...state.user,
  countryIso: R.path(['router', 'country'], state)
})

export default connect(mapStateToProps, {closeCountryMessageBoard})(MessageBoardView)
