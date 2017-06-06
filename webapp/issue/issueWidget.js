import * as R from 'ramda'
import React from 'react'
import { connect } from 'react-redux'

import './style.less'
import { postComment, retrieveComments } from './actions'

const mapIndexed = R.addIndex(R.map)

const Comments = ({comments}) =>
  <div>
    {
      mapIndexed((c, i) =>
          <div key={i} className="fra-issue__comment">
            <div className="fra-issue__comment-author">{c.email}</div>
            <div className="fra-issue__comment-time">just now</div>
            <div className="fra-issue__comment-text">
              {c.message}
            </div>
          </div>,
        comments)
    }
  </div>

const AddComment = ({countryIso, postComment, isFirst}) =>
  <div>
    <div
      className={`fra-issue__comment-edit-author${isFirst ? '' : '-empty'} `}>{isFirst ? `Jan Egeland` : ''}</div>
    <div contentEditable={true}
         id="fra-issue__comment-input"
         className="fra-issue__issue-comment-input"
         placeholder="Write comment message"></div>
    <button className="btn btn-icon btn-s"
            onClick={() =>
              postComment(countryIso, '1', null, document.getElementById('fra-issue__comment-input').innerHTML)}>
      <svg className="icon-24 icon-accent">
        <use xlinkHref="img/icon.svg#icon-circle-add"/>
      </svg>
    </button>
    <div className="great-clear"></div>
  </div>

const CommentStatus = ({count, ...props}) =>
  <div {...props} >
    {
      count > 0 ? <div className="fra-issue__issue-status-count">{count}</div> : <svg className="icon-24">
        <use xlinkHref="img/icon.svg#icon-circle-add"/>
      </svg>
    }
  </div>

const CommentThread = ({countryIso, comments, showAdd, postComment, close}) =>
  <div className={`fra-issue__issue ${showAdd ? '' : 'fra-issue__issue-hidden'}`}>
    <i className="fra-issue__issue-close" onClick={ e => close(e) }>
      <svg className="icon-24">
        <use xlinkHref="img/icon.svg#icon-small-remove"/>
      </svg>
    </i>
    <Comments comments={comments}/>
    <AddComment countryIso={countryIso} postComment={postComment}
                isFirst={comments.length === 0}/>
  </div>

class IssueWidget extends React.Component {

  constructor (props) {
    super(props)
    this.state = {showAddComment: false}
  }

  componentWillMount () {
    this.props.retrieveComments(this.props.countryIso)
  }

  componentWillReceiveProps (next) {
    if (next.countryIso !== this.props.countryIso) {
      this.props.retrieveComments(next.countryIso)
      this.setState({showAddComment: false})
    }
  }

  render () {
    const count = this.props.comments ? this.props.comments.length : 0
    const close = R.partial((ctx, evt) => ctx.setState({showAddComment: false}), [this])

    return <div className="fra-issue__add-issue">{
      this.state.showAddComment ? <CommentThread
        countryIso={this.props.countryIso}
        comments={this.props.comments || []}
        showAdd={this.state.showAddComment}
        postComment={this.props.postComment}
        close={close}/> :
        <CommentStatus count={count} onClick={() => this.setState({showAddComment: true})}/>
    }</div>
  }
}

const mapStateToProps = state => {
  return state.issue
}

export default connect(mapStateToProps, {postComment, retrieveComments})(IssueWidget)
