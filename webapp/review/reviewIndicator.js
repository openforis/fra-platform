import * as R from 'ramda'
import React from 'react'
import { connect } from 'react-redux'

import '../issue/style.less'
import { getCommentCount, openCommentThread, closeCommentThread } from './actions'

const CommentStatus = ({count, active, ...props}) =>
  <div {...props} className={`fra-review__issue-status ${active ? 'active' : ''}`}>
    {
      count > 0 ? <div className="fra-review__issue-status-count">{count}</div> :
        <svg className="icon"><use xlinkHref="img/icon.svg#icon-circle-add"/></svg>
    }
  </div>

class ReviewIndicator extends React.Component {

  constructor (props) {
    super(props)
  }

  componentDidMount () {
    this.props.getCommentCount(this.props.countryIso, this.props.section, this.props.target)
  }

  componentWillReceiveProps (next) {
    // changing country or target
    if (next.countryIso !== this.props.countryIso || !R.equals(next.target, this.props.target)) {
      this.props.getCommentCount(next.countryIso, next.section, next.target)
    }
  }

  render () {
    const targetProps = this.props[this.props.target] || {}
    const count = R.isNil(targetProps) ? 0 : targetProps.count // comments ? comments.length  : 0
    const active = this.props.openThread && this.props.section == this.props.openThread.section && R.equals(this.props.target, this.props.openThread.target) ? true : false
    return <div className="fra-review__add-issue">
      <CommentStatus count={count} active={active} onClick={() => {
        this.props.openCommentThread(this.props.countryIso, this.props.section, this.props.target, this.props.name)
      }}/>
    </div>
  }
}

const mapStateToProps = state => R.merge(state.review, state.user)

export default connect(mapStateToProps, {
  openCommentThread,
  closeCommentThread,
  getCommentCount
})(ReviewIndicator)
