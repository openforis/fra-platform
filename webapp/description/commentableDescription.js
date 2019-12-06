import React from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import * as R from 'ramda'

import Description from './description'
import ReviewIndicator from '../review/reviewIndicator'

const CommentableDescription = props => {
  const { disabled = false } = props
  const { countryIso } = useParams()

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
        countryIso={countryIso}
        template={props.template}
        disabled={disabled}
        showAlertEmptyContent={props.showAlertEmptyContent}
        showDashEmptyContent={props.showDashEmptyContent} />
    </div>
    <div className="fra-description__review-indicator-wrapper">
      {
        disabled
          ? null
          : <ReviewIndicator
            section={props.section}
            title={props.title}
            target={[props.name]}
            countryIso={countryIso}
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
