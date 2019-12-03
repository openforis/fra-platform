import React from 'react'
import * as R from 'ramda'
import assert from 'assert'
import { connect } from 'react-redux'
import Description from './description'
import ReviewIndicator from '../review/reviewIndicator'

const assertProps = props => assert(
  props.countryIso &&
  props.section &&
  props.name &&
  props.title,
  'Some property is missing for CommentableDescription'
)

const CommentableDescription = props => {
  assertProps(props)
  const {disabled = false} = props

  return <div className="fra-description">
    <div className={
      R.equals(props.openCommentThreadTarget, [props.name])
        ? 'fra-description__wrapper fra-row-comments__open'
        : 'fra-description__wrapper'
    }>
      <Description
        title={props.title}
        section={props.section}
        name={props.name}
        countryIso={props.countryIso}
        template={props.template}
        disabled={disabled}
        showAlertEmptyContent={props.showAlertEmptyContent}
        showDashEmptyContent={props.showDashEmptyContent}/>
    </div>
    <div className="fra-description__review-indicator-wrapper">
      {
        disabled
          ? null
          : <ReviewIndicator
            section={props.section}
            title={props.title}
            target={[props.name]}
            countryIso={props.countryIso}
          />
      }
    </div>
  </div>
}

const mapStateToProps = state =>
  ({
    openCommentThreadTarget: state.review.openThread ? state.review.openThread.target : null
  })

export default connect(mapStateToProps, {})(CommentableDescription)
