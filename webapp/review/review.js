import './style.less'
import * as R from 'ramda'
import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { useLocation, useParams } from 'react-router'

import { postComment, retrieveComments, closeCommentThread, markCommentAsDeleted, markIssueAsResolved } from './actions'
import { getRelativeDate } from '../utils/relativeDate'
import { isReviewer } from '../../common/countryRole'
import { profilePictureUri } from '../../common/userUtils'

import FraReviewFooter from './reviewFooter'
import Icon from '../reusableUiComponents/icon'

const mapIndexed = R.addIndex(R.map)

const AddComment = props => {

  const { i18n, userInfo, issueStatus, postComment, issueId, section, target, onCancel } = props
  const { countryIso } = useParams()

  const canAddComment = issueStatus !== 'resolved' || isReviewer(countryIso, userInfo)

  return <FraReviewFooter
    onSubmit={msg => postComment(issueId, countryIso, section, target, null, msg)}
    onCancel={() => onCancel()}
    placeholder={`${canAddComment ? i18n.t('review.writeComment') : i18n.t('review.commentingClosed')}`}
    i18n={i18n}
    submitBtnLabel={i18n.t('review.add')}
    cancelBtnLabel={i18n.t('review.cancel')}
    submitAllowed={canAddComment}
  />

}

const CommentThread = props => {
  const {
    comments,
    userInfo = {},
    section,
    target,
    issueStatus,
    markCommentAsDeleted,
    i18n
  } = props

  const { countryIso } = useParams()
  const commentScrollerRef = useRef(null)

  useEffect(() => {
    const element = commentScrollerRef.current
    if (element) {
      element.scrollTop = element.scrollHeight
    }
  })

  const isThisMe = R.pipe(R.prop('userId'), R.equals(userInfo.id))
  const isCommentDeleted = R.propEq('deleted', true)
  const isCommentStatusResolved = R.propEq('statusChanged', 'resolved')

  return (
    <div ref={commentScrollerRef} className="fra-review__comment-thread">
      {
        R.isNil(comments)
          ? null
          : R.not(R.isEmpty(comments))
          ? mapIndexed((c, i) =>
              <div key={i} className={`fra-review__comment ${isCommentDeleted(c) ? 'fra-review__comment-deleted' : ''}`}>
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
  )
}

const ReviewHeader = ({ title, close, userInfo, section, target, issueId, issueStatus, markIssueAsResolved, i18n }) => {
  const { countryIso } = useParams()

  return (
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
  )
}

const ReviewPanel = props => {
  const { i18n, userInfo, closeCommentThread } = props
  const { countryIso } = useParams()
  const location = useLocation()

  useEffect(() => {
    closeCommentThread(countryIso)
  }, [countryIso, location])

  const isActive = R.pipe(R.defaultTo({}), R.isEmpty, R.not)(props.openThread)
  const target = R.isNil(props.openThread) ? null : (props.openThread.target).join(',')
  const section = R.isNil(props.openThread) ? '' : props.openThread.section
  const title = R.isNil(props.openThread) ? '' : props.openThread.name
  const comments = R.defaultTo([], target ? props[target].issue : [])
  const issueId = comments && comments.length > 0 ? comments[0].issueId : null
  const issueStatus = comments && comments.length > 0 ? comments[0].issueStatus : null
  const close = () => closeCommentThread(countryIso, section, target)

  return isActive && (
    <div className="fra-review__container">
      <div className="fra-review">
        <ReviewHeader
          title={title}
          close={close}
          userInfo={userInfo}
          section={section}
          target={target}
          issueId={issueId}
          issueStatus={issueStatus}
          markIssueAsResolved={props.markIssueAsResolved}
          i18n={i18n}
        />
        <CommentThread
          comments={comments}
          userInfo={userInfo}
          section={section}
          target={target}
          markCommentAsDeleted={props.markCommentAsDeleted}
          issueStatus={issueStatus}
          i18n={i18n}
        />
        <AddComment
          issueId={issueId}
          section={section}
          target={target}
          postComment={props.postComment}
          onCancel={close}
          isFirst={comments.length === 0}
          userInfo={userInfo}
          issueStatus={issueStatus}
          i18n={i18n}
        />
      </div>
    </div>
  )
}

const mapSateToProps = state => R.pipe(R.prop('review'), R.defaultTo({}), R.merge(state.router), R.merge(state.user))(state)

export default connect(mapSateToProps, {
  postComment,
  retrieveComments,
  closeCommentThread,
  markCommentAsDeleted,
  markIssueAsResolved
})(ReviewPanel)

