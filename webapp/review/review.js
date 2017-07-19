import * as R from 'ramda'
import React from 'react'
import { connect } from 'react-redux'

import { postComment, retrieveComments, closeCommentThread, deleteComment } from './actions'

import './style.less'

const mapIndexed = R.addIndex(R.map)

const AddComment = ({issueId, countryIso, section, target, postComment, onCancel, isFirst, userInfo}) =>
  <div className="fra-review__add-comment">
    <div className="fra-review__issue-comment-input-border">
      <textarea
        rows="1"
        onInput={() => {
          const elem = document.getElementById(`fra-review__comment-input-${target}`)
          elem.style.height = 'auto'
          elem.style.height = `${elem.scrollHeight}px`
        }}
        id={`fra-review__comment-input-${target}`}
        className="fra-review__issue-comment-input"
        placeholder="Write a comment…"/>
    </div>
    <div className="fra-review__comment-buttons">
      <button className="fra-review__comment-add-btn btn btn-primary btn-s"
              onClick={() => {
                postComment(issueId, countryIso, section, target, null, document.getElementById(`fra-review__comment-input-${target}`).value)
                document.getElementById(`fra-review__comment-input-${target}`).value = ''
              }}>Add
      </button>
      <button className="btn btn-s btn-secondary" onClick={() => {
        onCancel()
      }}>Cancel
      </button>
    </div>
  </div>

const CommentThread = ({comments, userInfo = {}, countryIso, section, target, deleteComment}) => {
  const isThisMe = R.pipe(R.prop('userId'), R.equals(userInfo.id))
  const isCommentDeleted = R.propEq('deleted', true)

  return <div className={`fra-review__comment-widget-visible`}>
    <div className={`fra-review__issue fra-review__issue-visible`}>
      <div className='fra-review__comments'>
        {
          comments && R.not(R.isEmpty(comments)) ? mapIndexed((c, i) =>
            <div key={i} className="fra-review__comment">
              <div className="fra-review__comment-header">
                <div>
                  <img className="fra-review__avatar" src={`https://www.gravatar.com/avatar/${c.hash}?d=mm`}/>
                </div>
                <div className="fra-review__comment-author-section">
                  <div
                    className={`fra-review__comment-author ${ isCommentDeleted(c) ? 'fra-review__comment-deleted' : isThisMe(c) ? 'author-me' : ''}`}>
                    <div>{c.username}</div>
                    {isThisMe && !isCommentDeleted(c)
                      ? <button className="btn"
                                onClick={() => deleteComment(countryIso, section, target, c.commentId)}>Delete</button>
                      : null }
                  </div>
                  <div
                    className={`fra-review__comment-time ${isCommentDeleted(c) ? 'fra-review__comment-deleted' : ''}`}>
                    Just now
                  </div>
                </div>
              </div>
              <div className={`fra-review__comment-text ${isCommentDeleted(c) ? 'fra-review__comment-deleted' : ''}`}>
                {isCommentDeleted(c) ? 'Comment deleted' : c.message}
              </div>
            </div>,
            comments) : <div className='fra-review__comment-placeholder'>
            <svg className="fra-review__comment-placeholder-icon icon-24">
              <use xlinkHref="img/icon.svg#icon-chat-46"/>
            </svg>
            <span className="fra-review__comment-placeholder-text">No comments</span>
          </div>
        }
      </div>
    </div>
  </div>
}

const ReviewHeader = ({name, close}) =>
  <div className="fra-review__header">
    <h2 className="fra-review__header-title subhead">Comments</h2>
    <div className="fra-review__header-close-btn" onClick={e => close(e)}>
      <svg className="icon icon-24">
        <use xlinkHref="img/icon.svg#icon-small-remove"/>
      </svg>
    </div>
    {name ? <div className="fra-review__header-target">{name}</div> : null}
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
    const close = R.partial(ctx => {
      ctx.props.closeCommentThread()
    }, [this])

    return <div className={`fra-review-${isActive ? 'active' : 'hidden'}`}>
      <ReviewHeader name={name} close={close}/>
      <CommentThread
        comments={comments}
        userInfo={this.props.userInfo}
        countryIso={this.props.country}
        section={section}
        target={target}
        deleteComment={this.props.deleteComment}
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
      />
    </div>
  }
}

const mapSateToProps = state => R.pipe(R.prop('review'), R.defaultTo({}), R.merge(state.router), R.merge(state.user))(state)

export default connect(mapSateToProps, {
  postComment,
  retrieveComments,
  closeCommentThread,
  deleteComment
})(ReviewPanel)

