import './style.less'
import * as R from 'ramda'
import React from 'react'
import { connect } from 'react-redux'

import { postComment, retrieveComments, closeCommentThread, markCommentAsDeleted, markIssueAsResolved } from './actions'
import { getRelativeDate } from '../utils/relativeDate'
import { isReviewer } from '../../common/countryRole'
import {profilePictureUri} from '../../common/userUtils'

import FraReviewFooter from './reviewFooter'
import Icon from '../reusableUiComponents/icon'

const mapIndexed = R.addIndex(R.map)

class AddComment extends React.Component {

  constructor () {
    super()

    this.handleAddComment = this.handleAddComment.bind(this)
  }

  handleAddComment (msg) {
    const {postComment, issueId, countryIso, section, target} = this.props

    postComment(issueId, countryIso, section, target, null, msg)
  }

  render () {
    const {i18n, countryIso, userInfo, issueStatus, onCancel} = this.props

    const canAddComment = () => issueStatus !== 'resolved' || isReviewer(countryIso, userInfo)

    return <FraReviewFooter
      onSubmit={this.handleAddComment}
      onCancel={() => onCancel()}
      placeholder={`${canAddComment() ? this.props.i18n.t('review.writeComment') : this.props.i18n.t('review.commentingClosed')}`}
      i18n={i18n}
      submitBtnLabel={i18n.t('review.add')}
      cancelBtnLabel={i18n.t('review.cancel')}
      submitAllowed={canAddComment()}
    />

  }
}

class CommentThread extends React.Component {

  scrollToBottom () {
    if (this.refs.commentScroller) {
      this.refs.commentScroller.scrollTop = this.refs.commentScroller.scrollHeight
    }
  }

  componentDidMount () {
    this.scrollToBottom()
  }

  componentDidUpdate () {
    this.scrollToBottom()
  }

  render () {
    const {
      comments,
      userInfo = {},
      countryIso,
      section,
      target,
      issueStatus,
      markCommentAsDeleted,
      i18n
    } = this.props

    const isThisMe = R.pipe(R.prop('userId'), R.equals(userInfo.id))
    const isCommentDeleted = R.propEq('deleted', true)
    const isCommentStatusResolved = R.propEq('statusChanged', 'resolved')

    return <div ref="commentScroller" className="fra-review__comment-thread">
      {
        R.isNil(comments)
          ? null
          : R.not(R.isEmpty(comments))
          ? mapIndexed((c, i) =>
              <div key={i} className={`fra-review__comment ${ isCommentDeleted(c) ? 'fra-review__comment-deleted' : ''}`}>
                <div className="fra-review__comment-header">
                  <img className="fra-review__comment-avatar"
                       src={profilePictureUri(countryIso, c.userId)}/>
                  <div className="fra-review__comment-author-section">
                    <div className={`fra-review__comment-author ${isThisMe(c) ? 'author-me' : ''}`}>
                      {c.username}
                    </div>
                    {
                      isThisMe(c) && !isCommentDeleted(c) && !isCommentStatusResolved(c) && issueStatus !== 'resolved'
                        ? <button
                          className="btn fra-review__comment-delete-button"
                          onClick={() => window.confirm(i18n.t('review.confirmDelete'))
                            ? markCommentAsDeleted(countryIso, section, target, c.commentId)
                            : null
                          }>
                          {i18n.t('review.delete')}
                        </button>
                        : null
                    }
                    <div className="fra-review__comment-time">
                      {
                        isCommentDeleted(c)
                          ? i18n.t('review.commentDeleted')
                          : (getRelativeDate(c.addedTime, i18n) || i18n.t('time.aMomentAgo'))
                      }
                    </div>
                  </div>
                </div>
                <div className="fra-review__comment-text">
                  {
                    isCommentStatusResolved(c)
                      ? i18n.t('review.commentMarkedAsResolved')
                      : c.message
                  }
                </div>
              </div>,
            comments)
          : <div className='fra-review__comment-placeholder'>
            <Icon className="fra-review__comment-placeholder-icon icon-24" name="chat-46"/>
            <span className="fra-review__comment-placeholder-text">{i18n.t('review.noComments')}</span>
          </div>
      }
    </div>

  }
}

const ReviewHeader = ({title, close, userInfo, countryIso, section, target, issueId, issueStatus, markIssueAsResolved, i18n}) =>
  <div className="fra-review__header">
    <div className="fra-review__header-title">{i18n.t('review.comments')}</div>
    <div className="fra-review__header-close-btn" onClick={e => close(e)}>
      <Icon name="remove"/>
    </div>
    {title ? <div className="fra-review__header-target">{title}</div> : null}
    {issueId && isReviewer(countryIso, userInfo) && issueStatus !== 'resolved'
      ? <div className="fra-review__header-button">
        <button
          className="btn btn-primary btn-s"
          onClick={() => markIssueAsResolved(countryIso, section, target, issueId, userInfo.id)}>
          {i18n.t('review.resolve')}
        </button>
      </div>
      : null}
  </div>

class ReviewPanel extends React.Component {
  componentDidUpdate(prevProps, prevState) {
    if (!R.equals(this.props.country, prevProps.country)) {
      this.props.closeCommentThread(this.props.country)
    }
  }

  render () {
    const isActive = R.pipe(R.defaultTo({}), R.isEmpty, R.not)(this.props.openThread)
    const target = R.isNil(this.props.openThread) ? null : (this.props.openThread.target).join(',')
    const section = R.isNil(this.props.openThread) ? '' : this.props.openThread.section
    const title = R.isNil(this.props.openThread) ? '' : this.props.openThread.name
    const comments = R.defaultTo([], target ? this.props[target].issue : [])
    const issueId = comments && comments.length > 0 ? comments[0].issueId : null
    const issueStatus = comments && comments.length > 0 ? comments[0].issueStatus : null
    const close = R.partial(ctx => {
      ctx.props.closeCommentThread(this.props.country, section, target)
    }, [this])
    const i18n = this.props.i18n

    return isActive
      ? <div className="fra-review__container">
        <div className="fra-review">
          <ReviewHeader
            title={title}
            close={close}
            userInfo={this.props.userInfo}
            countryIso={this.props.country}
            section={section}
            target={target}
            issueId={issueId}
            issueStatus={issueStatus}
            markIssueAsResolved={this.props.markIssueAsResolved}
            i18n={i18n}
          />
          <CommentThread
            comments={comments}
            userInfo={this.props.userInfo}
            countryIso={this.props.country}
            section={section}
            target={target}
            markCommentAsDeleted={this.props.markCommentAsDeleted}
            issueStatus={issueStatus}
            i18n={i18n}
          />
          <AddComment
            issueId={issueId}
            countryIso={this.props.country}
            section={section}
            target={target}
            postComment={this.props.postComment}
            onCancel={close}
            isFirst={comments.length === 0}
            userInfo={this.props.userInfo}
            issueStatus={issueStatus}
            i18n={i18n}
          />
        </div>
      </div>
      : null
  }
}

const mapSateToProps = state => R.pipe(R.prop('review'), R.defaultTo({}), R.merge(state.router), R.merge(state.user))(state)

export default connect(mapSateToProps, {
  postComment,
  retrieveComments,
  closeCommentThread,
  markCommentAsDeleted,
  markIssueAsResolved
})(ReviewPanel)

