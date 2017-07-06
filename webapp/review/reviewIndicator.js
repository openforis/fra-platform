import * as R from 'ramda'
import React from 'react'
import { connect } from 'react-redux'

import '../issue/style.less'
import { getCommentCount, openCommentThread, closeCommentThread } from './actions'

const CommentStatus = ({count, visible, ...props}) =>
  <div {...props} className={`fra-review__issue-status-${visible ? 'visible' : 'hidden'}`}>
    {
      count > 0 ? <div className="fra-review__issue-status-count">{count}</div> :
        <svg className="icon"><use xlinkHref="img/icon.svg#icon-circle-add"/></svg>
    }
  </div>

class ReviewIndicator extends React.Component {

  constructor (props) {
    super(props)
  }

  componentWillMount () {
    this.props.getCommentCount(this.props.countryIso, this.props.section, this.props.target)
  }

  componentWillReceiveProps (next) {
    if (next.countryIso !== this.props.countryIso) { // changing country
      this.props.getCommentCount(next.countryIso, this.props.section, this.props.target)
    }
  }

  render () {
    const targetProps = this.props[this.props.target] || {}
    const count = R.isNil(targetProps) ? 0 : targetProps.count // comments ? comments.length  : 0

    return <div className="fra-review__add-issue">
      <CommentStatus count={count} visible={true} onClick={() => {
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
