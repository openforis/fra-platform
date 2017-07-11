import React from 'react'
import R from 'ramda'
import assert from 'assert'
import { connect } from 'react-redux'

import './style.less'
import ReviewIndicator from '../review/reviewIndicator'
import Description from '../description/description'

const assertProps = props =>
  assert(
    props.descriptionTitle &&
    props.descriptionName &&
    props.countryIso &&
    props.section,
    'Some property is missing for CommentableDescription'
  )

class CommentableReviewDescription extends React.Component {
  render() {
    assertProps(this.props)
    const reviewIndicatorTarget = [this.props.descriptionName]
    return <div className="commentable-description">
      <div className={
        R.equals(this.props.openCommentThreadTarget, reviewIndicatorTarget)
        ? 'commentable-description__description-wrapper fra-row-comments__open'
        : 'commentable-description__description-wrapper'
      }>
        <Description title={this.props.descriptionTitle}
                     name={this.props.descriptionName}
                     countryIso={this.props.countryIso}/>
      </div>
      <div className="commentable-description__review-indicator-wrapper">
        <ReviewIndicator section={this.props.section}
                         name=""
                         target={reviewIndicatorTarget}
                         countryIso={this.props.countryIso}/>
      </div>
    </div>
  }
}

const mapStateToProps = (state, props) => {
  return {
    ...props,
    openCommentThreadTarget: state.review.openThread ? state.review.openThread.target : null
  }
}

export default connect(mapStateToProps, {})(CommentableReviewDescription)
