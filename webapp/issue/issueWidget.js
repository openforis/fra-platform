import React from 'react'

import './style.less'

export default class IssueWidget extends React.Component {
  constructor (props) {
    super(props)
    this.state = {showAddComment: false}
  }
  render() {
    const AddComment = () =>
      <div className={`nde__issue ${this.state.showAddComment ? '' : 'nde__issue-hidden'}`}
           style={{left: `${this.props.leftPosition}px`}}>
        <i className="nde__issue-close" onClick={() => this.setState({showAddComment: false})}>X</i>
        <div contentEditable={true} className="nde__issue-comment-input" placeholder="Write comment message"></div>
        <button className="btn btn-primary btn-s">add</button>
      </div>

    return <div>{
      this.state.showAddComment ? <AddComment/> : <div onClick={() => this.setState({showAddComment: true})}>+</div>
    }</div>
  }
}

