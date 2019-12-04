import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as R from 'ramda'
import { useParams } from 'react-router-dom'

import FraReviewFooter from '../review/reviewFooter'
import Icon from '../reusableUiComponents/icon'

import { getRelativeDate } from '../utils/relativeDate'
import { profilePictureUri } from '../../common/userUtils'

import {
  closeCountryMessageBoard,
  sendCountryMessageBoard,
  fetchAllCountryMessageBoardMessages,
} from './actions'

const MessageBoardHeader = ({ i18n, closeCountryMessageBoard }) =>
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

  componentDidUpdate (prevProps) {
    const messages = R.prop('messages')(this.props)
    const prevMessages = R.prop('messages')(prevProps)

    if (messages.length > prevMessages.length)
      this.scrollToBottom()
  }

  render () {
    const { i18n, messages = [], countryIso, userInfo } = this.props

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
    const { countryIso, userInfo, sendCountryMessageBoard } = this.props

    sendCountryMessageBoard(countryIso, msg, userInfo.id, userInfo.name)
  }

  render () {
    const { i18n, closeCountryMessageBoard } = this.props

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

const MessageBoardView = props => {

  const {
    fetchAllCountryMessageBoardMessages, showMessageBoard
  } = props
  const { countryIso } = useParams()

  useEffect(() => {
    if (showMessageBoard) {
      fetchAllCountryMessageBoardMessages(countryIso)
    }
  }, [showMessageBoard, countryIso])

  return showMessageBoard && (
    <div className="fra-review__container">
      <div className="fra-review user-chat">
        <MessageBoardHeader {...props} countryIso={countryIso}/>
        <MessageBoardMessages {...props} countryIso={countryIso}/>
        <MessageBoardAddMessage {...props} countryIso={countryIso}/>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  showMessageBoard: R.pathEq(['countryMessageBoard', 'show'], true)(state),
  messages: R.path(['countryMessageBoard', 'messages'])(state),
  ...state.user,
  countryIso: R.path(['router', 'country'], state)
})

export default connect(
  mapStateToProps,
  { closeCountryMessageBoard, sendCountryMessageBoard, fetchAllCountryMessageBoardMessages }
)(MessageBoardView)
