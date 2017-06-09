import * as R from 'ramda'
import React from 'react'
import { connect } from 'react-redux'

import './style.less'
import { postComment, retrieveComments, openCommentThread, closeCommentThread } from './actions'

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

const AddComment = ({issueId, countryIso, section, target, postComment, onCancel, isFirst}) =>
  <div>
    <div
      className={`fra-issue__comment-edit-author${isFirst ? '' : '-empty'} `}>{isFirst ? `Jan Egeland` : ''}</div>
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
         placeholder="Write comment message"></textarea>
    <button className="fra-issue__comment-add-btn btn btn-primary btn-s"
            onClick={() => {
              postComment(issueId, countryIso, section, target, null, document.getElementById(`fra-issue__comment-input-${target}`).value)
              document.getElementById(`fra-issue__comment-input-${target}`).value = ''
            }}>Add</button>
    <button className="btn btn-s btn-secondary" onClick={() => onCancel()}>Cancel</button>
  </div>

const CommentStatus = ({count, visible, ...props}) =>
  <div {...props} className={`fra-issue__issue-status-${visible ? 'visible' : 'hidden'}`} >
    {
      count > 0 ? <div className="fra-issue__issue-status-count">{count}</div> : <svg className="icon-24">
        <use xlinkHref="img/icon.svg#icon-circle-add"/>
      </svg>
    }
  </div>

const CommentThread = ({countryIso, section, target, comments, showAdd, postComment, close}) => {
  const issueId = comments.length > 0 ? comments[0].issueId : null
  return   <div className={`fra-issue__issue ${showAdd ? 'fra-issue__issue-visible' : 'fra-issue__issue-hidden'}`}>
    <div className="fra-issue__triangle-marker">
      <div className="fra-issue__triangle"></div>
    </div>
    <Comments comments={comments}/>
    <AddComment issueId={issueId} countryIso={countryIso} section={section} target={target} postComment={postComment}
                onCancel={close}
                isFirst={comments.length === 0}/>
  </div>

class IssueWidget extends React.Component {

  constructor (props) {
    super(props)
    this.state = {showAddComment: false}
  }

  componentWillMount () {
    this.props.retrieveComments(this.props.countryIso, this.props.section, this.props.target)
  }

  componentWillReceiveProps (next) {
    if (next.countryIso !== this.props.countryIso) { // changing country
      this.props.closeCommentThread(this.props.target)
      this.props.retrieveComments(next.countryIso, this.props.section, this.props.target)
      this.setState({showAddComment: false})
    }
    if(!next.openThread || next.openThread.join('_') !== this.props.target.join('_')) { // other comment thread is opened, close this
      this.setState({showAddComment: false})
    }
  }

  render () {
    const comments = this.props[this.props.target] || []
    const count = comments ? comments.length  : 0
    const style= {'zIndex': this.state.showAddComment ? 1: 0 }
    const close = R.partial(ctx => {
      ctx.props.closeCommentThread(ctx.props.taret)
      ctx.setState({showAddComment: false})}, [this])

    return <div className="fra-issue__add-issue" style={style}>
       <CommentThread
        countryIso={this.props.countryIso}
        target={this.props.target}
        comments={comments}
        section={this.props.section}
        showAdd={this.state.showAddComment}
        postComment={this.props.postComment}
        close={close}/>
        <CommentStatus count={count} visible={!this.state.showAddComment} onClick={() => {
          this.props.openCommentThread(this.props.target)
          window.setTimeout(() => this.setState({showAddComment: true}), 0)
        }}/>
    </div>
  }
}

const mapStateToProps = state => {
  return state.issue
}

export default connect(mapStateToProps, {
  openCommentThread,
  closeCommentThread,
  postComment,
  retrieveComments
})(IssueWidget)
