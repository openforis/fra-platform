import React from 'react'
import { connect } from 'react-redux'

import './style.less'
import { postComment, retrieveComments } from './actions'

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

    const Comments = ({comments}) => {
      return <div>
        {
          comments.map(
            c =>
              <div className="nde__comment">
                <div className="nde__comment-author">{c.email}</div>
                <div className="nde__comment-time">just now</div>
                <div className="nde__comment-text">
                  {c.message}
                </div>
              </div>)
        }
      </div>
    }

    const AddComment = ({first}) =>
      <div>
        <div className={`nde__comment-edit-author${first ? '': '-empty'} `}>{first ? `Örjan Jonsson` : ''}</div>
        <div contentEditable={true}
             id="nde__comment-input"
             className="nde__issue-comment-input"
             placeholder="Write comment message"></div>
        <button className="btn btn-icon btn-s"
                onClick={() => this.props.postComment(this.props.countryIso, '1', null, document.getElementById("nde__comment-input").innerHTML)}>
          <svg className="icon-24 icon-accent">
            <use xlinkHref="img/icon.svg#icon-circle-add"/>
          </svg>
        </button>
        <div className="great-clear"></div>
      </div>

    const CommentThread = ({comments}) =>
        <div className={`nde__issue ${this.state.showAddComment ? '' : 'nde__issue-hidden'}`}>
        <i className="nde__issue-close" onClick={() => this.setState({showAddComment: false})}>
          <svg className="icon-24">
            <use xlinkHref="img/icon.svg#icon-small-remove"/>
          </svg>
        </i>
        <Comments comments={comments}/>
        <AddComment first={comments.length === 0} />
      </div>

    const CommentStatus = ({count}) => {
      return <div onClick={() => this.setState({showAddComment: true})}>
        {
          count > 0 ? <div className="nde__issue-status-count">{count}</div> :
            <svg className="icon-24">
              <use xlinkHref="img/icon.svg#icon-circle-add"/>
            </svg>
        }
      </div>
    }
    const count = this.props.comments ? this.props.comments.length : 0

    return <div className="nde__add-issue">{
      this.state.showAddComment ? <CommentThread comments={this.props.comments || []}/> :
        <CommentStatus count={count}/>
    }</div>
  }
}

const mapStateToProps = state => {
  return state.issue
}

export default connect(mapStateToProps, {postComment, retrieveComments})(IssueWidget)
