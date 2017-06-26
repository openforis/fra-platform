import * as R from 'ramda'
import React from 'react'
import { connect } from 'react-redux'

import './style.less'
import {getCommentCount, openCommentThread, closeCommentThread } from './actions'

const CommentStatus = ({count, visible, ...props}) =>
  <div {...props} className={`fra-issue__issue-status-${visible ? 'visible' : 'hidden'}`} >
    {
      count > 0 ? <div className="fra-issue__issue-status-count">{count}</div> : <svg className="icon-24">
        <use xlinkHref="img/icon.svg#icon-circle-add"/>
      </svg>
    }
  </div>

class IssueWidget extends React.Component {

  constructor (props) {
    super(props)
    this.state = {widgetVisualState: 'hidden'}
  }

  componentWillMount () {
    this.props.getCommentCount(this.props.countryIso, this.props.section, this.props.target)
  }

  componentWillReceiveProps (next) {
    if (next.countryIso !== this.props.countryIso) { // changing country
      this.props.getCommentCount(next.countryIso, this.props.section, this.props.target)
    }
    if(!next.openThread) { // comments are being closed

    }
  }

  render () {
    const targetCount = this.props[this.props.target] || {}
    const count = R.isEmpty(targetCount) ? 0 : targetCount// comments ? comments.length  : 0
    const style= {'zIndex': this.state.widgetVisualState === 'visible' ? 1: 0 }
    const close = R.partial(ctx => {
      ctx.props.closeCommentThread(ctx.props.target)
      ctx.setState({widgetVisualState: 'hidden'})}, [this])

    return <div className="fra-issue__add-issue" style={style}>
      <CommentStatus count={count} visible={true} onClick={() => {
        this.props.openCommentThread(this.props.target)
        window.setTimeout(() => this.setState({widgetVisualState: 'visible'}), 0)
      }}/>
    </div>
  }
}

const mapStateToProps = state => R.merge(state.issue, state.user)

  export default connect(mapStateToProps, {
    openCommentThread,
    closeCommentThread,
    getCommentCount
  })(IssueWidget)
