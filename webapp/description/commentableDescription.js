import React from 'react'
import assert from 'assert'
import { connect } from 'react-redux'

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
    console.log('CommentableReviewDescription.render')
    assertProps(this.props)
    return <div className="tv__description-with-review-indicator">
      <div className="tv__description-wrapper">
        <Description title={this.props.descriptionTitle}
                     name={this.props.descriptionName}
                     countryIso={this.props.countryIso}/>
      </div>
      <div className="tv__review-indicator-wrapper">
        <ReviewIndicator section={this.props.section}
                         name=""
                         target={[this.props.descriptionName]}
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
