import './style.less'
import * as R from 'ramda'
import React from 'react'
import { connect } from 'react-redux'
import { postComment, retrieveComments, closeCommentThread, markCommentAsDeleted, markIssueAsResolved } from './actions'
import { parse, differenceInMonths, differenceInWeeks, differenceInDays, differenceInHours, format } from 'date-fns'
import { isReviewer } from '../../common/countryRole'

const mapIndexed = R.addIndex(R.map)

const AddComment = ({issueId, countryIso, section, target, postComment, onCancel, isFirst, userInfo, issueStatus, i18n}) => {
  const canAddComment = () => issueStatus !== 'resolved' || isReviewer(countryIso, userInfo)

  return <div className="fra-review__add-comment">
    <div className="fra-review__issue-comment-input-border">
      <textarea
        disabled={!canAddComment()}
        rows="1"
        onInput={() => {
          const elem = document.getElementById(`fra-review__comment-input-${target}`)
          elem.style.height = 'auto'
          elem.style.height = `${elem.scrollHeight}px`
        }}
        id={`fra-review__comment-input-${target}`}
        className="fra-review__issue-comment-input"
        placeholder={`${canAddComment() ? i18n.t('review.writeComment') : i18n.t('review.commentingClosed')}`}/>
    </div>
    <div className="fra-review__comment-buttons">
      <button className="fra-review__comment-add-btn btn btn-primary btn-s"
              disabled={!canAddComment()}
              onClick={() => {
                postComment(issueId, countryIso, section, target, null, document.getElementById(`fra-review__comment-input-${target}`).value)
                document.getElementById(`fra-review__comment-input-${target}`).value = ''
              }}>
        {i18n.t('review.add')}
      </button>
      <button className="btn btn-s btn-secondary"
              disabled={!canAddComment()}
              onClick={() => onCancel()}>
        {i18n.t('review.cancel')}
      </button>
    </div>
  </div>
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
    const getCommentTimestamp = c => {
      const commentTimestamp = parse(c.addedTime)
      const now = new Date()

      const formatDiff = (fn, unit) => i18n.t(`review.commentTime.${unit}`, {count: fn(now, commentTimestamp)})

      if (differenceInMonths(now, commentTimestamp) > 0)
        return format(commentTimestamp, 'DD MMMM YYYY')

      if (differenceInWeeks(now, commentTimestamp) > 0)
        return formatDiff(differenceInWeeks, 'week')

      if (differenceInDays(now, commentTimestamp) > 0)
        return formatDiff(differenceInDays, 'day')

      if (differenceInHours(now, commentTimestamp) > 0)
        return formatDiff(differenceInHours, 'hour')

      return i18n.t('review.commentTime.aMomentAgo')
    }

    return <div className={`fra-review__comment-widget-visible`}>
      <div ref="commentScroller" className={`fra-review__issue fra-review__issue-visible`}>
        <div className='fra-review__comments'>
          {
            comments && R.not(R.isEmpty(comments))
              ? mapIndexed((c, i) =>
                <div key={i} className="fra-review__comment">
                  <div className="fra-review__comment-header">
                    <div>
                      <img className="fra-review__avatar" src={`https://www.gravatar.com/avatar/${c.hash}?default=mm`}/>
                    </div>
                    <div className="fra-review__comment-author-section">
                      <div
                        className={`fra-review__comment-author ${ isCommentDeleted(c) ? 'fra-review__comment-deleted' : isThisMe(c) ? 'author-me' : ''}`}>
                        <div>{c.username}</div>
                        {isThisMe(c) && !isCommentDeleted(c) && !isCommentStatusResolved(c) && issueStatus !== 'resolved'
                          ? <button className="btn fra-review__comment-delete-button"
                                    onClick={() => markCommentAsDeleted(countryIso, section, target, c.commentId)}>
                            {i18n.t('review.delete')}
                          </button>
                          : null}
                      </div>
                      <div
                        className={`fra-review__comment-time ${isCommentDeleted(c) ? 'fra-review__comment-deleted' : ''}`}>
                        {getCommentTimestamp(c)}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`fra-review__comment-text ${isCommentDeleted(c) ? 'fra-review__comment-deleted-text' : ''}`}>
                    {isCommentDeleted(c)
                      ? i18n.t('review.commentDeleted')
                      : isCommentStatusResolved(c)
                        ? i18n.t('review.commentMarkedAsResolved')
                        : c.message}
                  </div>
                </div>,
              comments)
              : <div className='fra-review__comment-placeholder'>
                <svg className="fra-review__comment-placeholder-icon icon-24">
                  <use href="img/icons.svg#chat-46"/>
                </svg>
                <span className="fra-review__comment-placeholder-text">{i18n.t('review.noComments')}</span>
              </div>
          }
        </div>
      </div>
    </div>

  }
}

const ReviewHeader = ({name, close, userInfo, countryIso, section, target, issueId, issueStatus, markIssueAsResolved, i18n}) =>
  <div className="fra-review__header">
    <h2 className="fra-review__header-title subhead">{i18n.t('review.comments')}</h2>
    <div className="fra-review__header-close-btn" onClick={e => close(e)}>
      <svg className="icon icon-24">
        <use href="img/icons.svg#small-remove"/>
      </svg>
    </div>
    {name ? <div className="fra-review__header-target">{name}</div> : null}
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
  componentWillReceiveProps (next) {
    if (!R.equals(this.props.country, next.country)) {
      this.props.closeCommentThread()
    }
  }

  render () {
    const isActive = R.pipe(R.defaultTo({}), R.isEmpty, R.not)(this.props.openThread)
    const target = R.isNil(this.props.openThread) ? null : (this.props.openThread.target).join(',')
    const section = R.isNil(this.props.openThread) ? '' : this.props.openThread.section
    const name = R.isNil(this.props.openThread) ? '' : this.props.openThread.name
    const comments = R.defaultTo([], target ? this.props[target].issue : [])
    const issueId = comments && comments.length > 0 ? comments[0].issueId : null
    const issueStatus = comments && comments.length > 0 ? comments[0].issueStatus : null
    const close = R.partial(ctx => {
      ctx.props.closeCommentThread()
    }, [this])
    const i18n = this.props.i18n

    return <div className={`fra-review-${isActive ? 'active' : 'hidden'}`}>
      <ReviewHeader
        name={name}
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

