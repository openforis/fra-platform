import * as R from 'ramda'
import React from 'react'
import { connect } from 'react-redux'

import { postComment, retrieveComments, closeCommentThread } from './actions'

import './style.less'

const mapIndexed = R.addIndex(R.map)

const Comments = ({comments}) =>
  <div className='fra-review__comments'>
    {
      comments && R.not(R.isEmpty(comments)) ?
      mapIndexed((c, i) =>
          <div key={i} className="fra-review__comment">
            <div className="fra-review__comment-author">{c.username}</div>
            <div className="fra-review__comment-time">just now</div>
            <div className="fra-review__comment-text">
              {c.message}
            </div>
          </div>,
        comments) : <div className='fra-review__comment-placeholder'>
        <svg className="icon"><use xlinkHref="img/icon.svg#icon-chat-45"/></svg>
        <span className="fra-review__comment-placeholder-text">No comments</span>
      </div>
    }
  </div>

const AddComment = ({issueId, countryIso, section, target, postComment, onCancel, isFirst, userInfo}) =>
  <div className="fra-review__add-comment">
    <textarea
      onKeyUp={(e) => {
        if(e.keyCode === 8) {
          const elem = document.getElementById(`fra-review__comment-input-${target}`)
          if(elem.textLength === 0) {
            elem.style.height = '40px'
          }
        }
        if(e.keyCode === 27) { // escape
          onCancel()
        }
      } }
      onInput={() => {
        const elem = document.getElementById(`fra-review__comment-input-${target}`)
        elem.style.height= `${elem.scrollHeight}px`
      }}
      id={`fra-review__comment-input-${target}`}
      className="fra-review__issue-comment-input"
      placeholder="Write a comment"/>
    <div className="fra-review__comment-buttons">
      <button className="fra-review__comment-add-btn btn btn-primary btn-s"
              onClick={() => {
                postComment(issueId, countryIso, section, target, null, document.getElementById(`fra-review__comment-input-${target}`).value)
                document.getElementById(`fra-review__comment-input-${target}`).value = ''
              }}>Add</button>
      <button className="btn btn-s btn-secondary" onClick={() => {
        onCancel()
      }}>Cancel</button>
    </div>
  </div>

const CommentThread = ({comments}) => {
  return <div className={`fra-review__comment-widget-visible`}>
    <div className={`fra-review__issue fra-review__issue-visible`}>
      <div className="fra-review__triangle-marker">
        <div className="fra-review__triangle"></div>
      </div>
      <Comments comments={comments}/>
    </div>
  </div>
}

const ReviewHeader = ({name, close}) =>
  <div className="fra-review__header">
    <h2>Comments</h2>
    <div className="fra-review__header-close-btn" onClick={e => close(e)}>
      <svg className="icon icon-24"><use xlinkHref="img/icon.svg#icon-small-remove"/></svg>
    </div>
    <span>{name}</span>
  </div>

class ReviewPanel extends React.Component {

render() {
  const isActive = R.pipe(R.defaultTo({}), R.isEmpty, R.not)(this.props.openThread)
  const target = R.isNil(this.props.openThread) ? null : R.head(this.props.openThread.target)
  const section = R.isNil(this.props.openThread) ? '' : this.props.openThread.section
  const name = R.isNil(this.props.openThread) ? '' : this.props.openThread.name
  const comments = R.defaultTo([], target ? this.props[target].issue : [])
  const issueId = comments && comments.length > 0 ? comments[0].issueId : null
  const close = R.partial(ctx => {
    ctx.props.closeCommentThread(ctx.props.target)
  }, [this])

  return <div className={`fra-review-${isActive ? 'active' : 'hidden'}`}>
    <ReviewHeader name={name} close={close} />
    <CommentThread
    comments={comments}/>
    <AddComment issueId={issueId}
                countryIso={this.props.country}
                section={section}
                target={target}
                postComment={this.props.postComment}
                onCancel={close}
                isFirst={comments.length === 0}
                userInfo={this.props.userInfo}/>
  </div>
}
}

const mapSateToProps = state => R.pipe(R.prop('review'), R.defaultTo({}), R.merge(state.router), R.merge(state.user))(state)

export default connect(mapSateToProps, {postComment, retrieveComments, closeCommentThread})(ReviewPanel)

