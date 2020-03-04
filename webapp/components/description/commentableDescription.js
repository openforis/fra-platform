import React from 'react'
import { useSelector } from 'react-redux'
import * as R from 'ramda'

import Description from './description'
import ReviewIndicator from '@webapp/app/assessment/components/review/reviewIndicator'
import * as ReviewState from '@webapp/app/assessment/components/review/reviewState'
import useCountryIso from '@webapp/components/hooks/useCountryIso'

const CommentableDescription = props => {
  const { disabled = false,
    title,
    section,
    name,
    template,
    showAlertEmptyContent,
    showDashEmptyContent,
  } = props
  const openCommentThreadTarget = useSelector(ReviewState.getOpenThreadTarget)
  const countryIso = useCountryIso()

  return <div className="fra-description">
    <div className={
      R.equals(openCommentThreadTarget, [name])
        ? 'fra-description__wrapper fra-row-comments__open'
        : 'fra-description__wrapper'
    }>
      <Description
        title={title}
        section={section}
        name={name}
        template={template}
        disabled={disabled}
        showAlertEmptyContent={showAlertEmptyContent}
        showDashEmptyContent={showDashEmptyContent} />
    </div>
    <div className="fra-description__review-indicator-wrapper">
      {
        !disabled &&
        <ReviewIndicator
          section={section}
          title={title}
          target={[name]}
          countryIso={countryIso}
        />
      }
    </div>
  </div>
}

export default CommentableDescription
