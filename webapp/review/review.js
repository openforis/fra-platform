import * as R from 'ramda'
import React from 'react'
import { connect } from 'react-redux'

import {postComment, retrieveComments} from './actions'

import './style.less'

const mapIndexed = R.addIndex(R.map)

const Comments = ({comments}) =>
  <div>
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
  <div>
    <div
      className={`fra-issue__comment-edit-author${isFirst ? '' : '-empty'} `}>{isFirst ? R.path(['name'], userInfo) : ''}</div>
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
      <button className="btn btn-s btn-secondary" onClick={() => onCancel()}>Cancel</button>
    </div>
  </div>

const CommentThread = ({countryIso, section, target, comments, visualState, postComment, close, userInfo}) => {
  const issueId = comments.length > 0 ? comments[0].issueId : null
  return <div className={`fra-issue__comment-widget-${visualState}`}>
    <div className={`fra-issue__issue fra-issue__issue-visible`}>
      <div className="fra-issue__triangle-marker">
        <div className="fra-issue__triangle"></div>
      </div>
      <Comments comments={comments}/>
      <AddComment issueId={issueId}
                  countryIso={countryIso}
                  section={section}
                  target={target}
                  postComment={postComment}
                  onCancel={close}
                  isFirst={comments.length === 0}
                  userInfo={userInfo}/>
    </div>
  </div>
}

const ReviewPanel = ({active}) => <div className={`review-panel ${active ? 'active' : 'hidden'}`}>hello
  {/*<CommentThread*/}
    {/*countryIso={this.props.countryIso}*/}
    {/*target={this.props.target}*/}
    {/*comments={comments}*/}
    {/*section={this.props.section}*/}
    {/*visualState={this.state.widgetVisualState}*/}
    {/*postComment={this.props.postComment}*/}
    {/*close={close}*/}
    {/*userInfo={this.props.userInfo}/>*/}
</div>

const mapSateToProps = R.pipe(R.prop('review'), R.defaultTo({}))

export default connect(mapSateToProps, {postComment, retrieveComments})(ReviewPanel)

