import React from 'react'
import { connect, useSelector } from 'react-redux'
import * as R from 'ramda'

import Description from './description'
import ReviewIndicator from '@webapp/loggedin/review/reviewIndicator'
import * as AppState from '@webapp/app/appState'

const CommentableDescription = props => {
  const { disabled = false } = props
  const countryIso = useSelector(AppState.getCountryIso)

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
        showDashEmptyContent={props.showDashEmptyContent}/>
    </div>
    <div className="fra-description__review-indicator-wrapper">
      {
        !disabled &&
        <ReviewIndicator
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
