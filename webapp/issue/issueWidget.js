import React from 'react'
import { connect } from 'react-redux'

import './style.less'
import {postComment} from './actions'

class IssueWidget extends React.Component {
  constructor (props) {
    super(props)
    console.log("props", props)
    this.state = {showAddComment: false}
  }
  render() {
    const AddComment = () =>
      <div className={`nde__issue ${this.state.showAddComment ? '' : 'nde__issue-hidden'}`}
           >
        <i className="nde__issue-close" onClick={() => this.setState({showAddComment: false})}>
          <svg className="icon"><use xlinkHref="img/icon.svg#icon-small-remove"/></svg>
        </i>
        <div className="nde__issue-author">Örjan Jonsson</div>
        <div contentEditable={true} className="nde__issue-comment-input" placeholder="Write comment message"></div>
        <button className="btn btn-icon btn-s" onClick={() => this.props.postComment(this.props.countryIso, "1", null, "data")}>
          <svg className="icon-24 icon-accent"><use xlinkHref="img/icon.svg#icon-circle-add"/></svg>
        </button>
        <div className="great-clear" ></div>
      </div>

    return <div className="nde__add-issue">{
      this.state.showAddComment ? <AddComment/> : <div onClick={() => this.setState({showAddComment: true})}>
        <svg className="icon-24"><use xlinkHref="img/icon.svg#icon-circle-add"/></svg>
      </div>
    }</div>
  }
}

const mapStateToProps = state => state.issueWidget

export default connect(mapStateToProps, {postComment})(IssueWidget)
