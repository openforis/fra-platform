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

  componentDidUpdate () {
    // this.props.retrieveComments(this.props.countryIso)
  }

  componentWillReceiveProps () {
    console.log('hello, new props on the way')
  }

  render () {
    console.log('comments', this.props.comments)
    const AddComment = () =>
      <div className={`nde__issue ${this.state.showAddComment ? '' : 'nde__issue-hidden'}`}>
        <i className="nde__issue-close" onClick={() => this.setState({showAddComment: false})}>
          <svg className="icon">
            <use xlinkHref="img/icon.svg#icon-small-remove"/>
          </svg>
        </i>
        <div className="nde__issue-author">Örjan Jonsson</div>
        <div contentEditable={true} className="nde__issue-comment-input" placeholder="Write comment message"></div>
        <button className="btn btn-icon btn-s"
                onClick={() => this.props.postComment(this.props.countryIso, '1', null, 'data')}>
          <svg className="icon-24 icon-accent">
            <use xlinkHref="img/icon.svg#icon-circle-add"/>
          </svg>
        </button>
        <div className="great-clear"></div>
      </div>

    const CommentStatus = ({count}) => {
      console.log('length', count)
      return <div onClick={() => this.setState({showAddComment: true})}>
        {
          count > 0 ? <div className="nde__issue-status-count">{count}</div> : <svg className="icon-24">
            <use xlinkHref="img/icon.svg#icon-circle-add"/>
          </svg>
        }
      </div>
    }
    const count = this.props.comments ? this.props.comments.length : 0

    return <div className="nde__add-issue">{
      this.state.showAddComment ? <AddComment/> : <CommentStatus count={count}/>
    }</div>
  }
}

const mapStateToProps = state => {
  console.log('state->props', state)
  return state.issue
}

export default connect(mapStateToProps, {postComment, retrieveComments})(IssueWidget)
