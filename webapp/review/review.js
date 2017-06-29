import * as R from 'ramda'
import React from 'react'
import { connect } from 'react-redux'

import {postComment, retrieveComments, closeCommentThread} from './actions'

import './style.less'

const mapIndexed = R.addIndex(R.map)

const Comments = ({comments}) =>
  <div className='review-panel__comments'>
    {
      mapIndexed((c, i) =>
          <div key={i} className="fra-issue__comment">
            <div className="fra-issue__comment-author">{c.username}</div>
            <div className="fra-issue__comment-time">just now</div>
            <div className="fra-issue__comment-text">
              {c.message}
            </div>
          </div>,
        comments)
    }
  </div>

const AddComment = ({issueId, countryIso, section, target, postComment, onCancel, isFirst, userInfo}) =>
  <div className="review-panel__add-comment">
    <textarea
      onKeyUp={(e) => {
        if(e.keyCode === 8) {
          const elem = document.getElementById(`fra-issue__comment-input-${target}`)
          if(elem.textLength === 0) {
            elem.style.height = '40px'
          }
        }
        if(e.keyCode === 27) { // escape
          onCancel()
        }
      } }
      onInput={() => {
        const elem = document.getElementById(`fra-issue__comment-input-${target}`)
        elem.style.height= `${elem.scrollHeight}px`
      }}
      id={`fra-issue__comment-input-${target}`}
      className="fra-issue__issue-comment-input"
      placeholder="Write a comment"/>
    <div className="fra-issue__comment-buttons">
      <button className="fra-issue__comment-add-btn btn btn-primary btn-s"
              onClick={() => {
                postComment(issueId, countryIso, section, target, null, document.getElementById(`fra-issue__comment-input-${target}`).value)
                document.getElementById(`fra-issue__comment-input-${target}`).value = ''
              }}>Add</button>
      <button className="btn btn-s btn-secondary" onClick={() => {
        console.log('cancel')
        onCancel()
      }}>Cancel</button>
    </div>
  </div>

const CommentThread = ({countryIso, section, target, comments, visualState, postComment, close, userInfo}) => {
  return <div className={`fra-issue__comment-widget-visible`}>
    <div className={`fra-issue__issue fra-issue__issue-visible`}>
      <div className="fra-issue__triangle-marker">
        <div className="fra-issue__triangle"></div>
      </div>
      <Comments comments={comments}/>
    </div>
  </div>
}

class ReviewPanel extends React.Component {

render() {
  const isActive = R.pipe(R.defaultTo([]), R.isEmpty, R.not)(this.props.openThread)
  const target = isActive ? R.head(this.props.openThread) : null
  const comments = R.defaultTo([], target ? this.props[target].issue : [])
  const issueId = comments && comments.length > 0 ? comments[0].issueId : null
  const close = R.partial(ctx => {
    ctx.props.closeCommentThread(ctx.props.target)
  }, [this])
  console.log('target',  target)

  return <div className={`review-panel-${isActive ? 'active' : 'hidden'}`}>
    <CommentThread
    comments={R.defaultTo([], comments)}/>
    <AddComment issueId={issueId}
                countryIso={this.props.country}
                section='EOF'
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

