import * as R from 'ramda'
import React from 'react'
import { connect } from 'react-redux'

import './style.less'
import {postComment, retrieveComments, openCommentThread, closeCommentThread } from './actions'

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

const CommentStatus = ({count, visible, ...props}) =>
  <div {...props} className={`fra-issue__issue-status-${visible ? 'visible' : 'hidden'}`} >
    {
      count > 0 ? <div className="fra-issue__issue-status-count">{count}</div> : <svg className="icon-24">
        <use xlinkHref="img/icon.svg#icon-circle-add"/>
      </svg>
    }
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
class IssueWidget extends React.Component {

  constructor (props) {
    super(props)
    this.state = {widgetVisualState: 'hidden'}
  }

  componentWillMount () {
    this.props.retrieveComments(this.props.countryIso, this.props.section, this.props.target)
  }

  componentWillReceiveProps (next) {
    if (next.countryIso !== this.props.countryIso) { // changing country
      this.props.closeCommentThread(this.props.target)
      this.props.retrieveComments(next.countryIso, this.props.section, this.props.target)
      this.setState({widgetVisualState: 'hidden'})
    }
    if(!next.openThread) { // comments are being closed
      this.setState({widgetVisualState: 'hidden'})
    }
    else if(next.openThread.join('_') !== this.props.target.join('_')) { // other comment thread is opened, close this
      this.setState({widgetVisualState: 'otherTarget'})
    }
  }

  render () {
    const comments = this.props[this.props.target] || []
    const count = comments ? comments.length  : 0
    const style= {'zIndex': this.state.widgetVisualState === 'visible' ? 1: 0 }
    const close = R.partial(ctx => {
      ctx.props.closeCommentThread(ctx.props.target)
      ctx.setState({widgetVisualState: 'hidden'})}, [this])

    return <div className="fra-issue__add-issue" style={style}>
      <CommentStatus count={count} visible={true} onClick={() => {
        this.props.openCommentThread(this.props.target)
        window.setTimeout(() => this.setState({widgetVisualState: 'visible'}), 0)
      }}/>
       <CommentThread
        countryIso={this.props.countryIso}
        target={this.props.target}
        comments={comments}
        section={this.props.section}
        visualState={this.state.widgetVisualState}
        postComment={this.props.postComment}
        close={close}
        userInfo={this.props.userInfo}/>
    </div>
  }
}

const mapStateToProps = state => R.merge(state.issue, state.user)

  export default connect(mapStateToProps, {
    openCommentThread,
    closeCommentThread,
    postComment,
    retrieveComments
  })(IssueWidget)
