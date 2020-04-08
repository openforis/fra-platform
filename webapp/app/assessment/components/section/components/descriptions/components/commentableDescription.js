import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import * as R from 'ramda'

import ReviewIndicator from '@webapp/app/assessment/components/review/reviewIndicator'
import useCountryIso from '@webapp/components/hooks/useCountryIso'

import * as ReviewState from '@webapp/app/assessment/components/review/reviewState'

import Description from './description'

const CommentableDescription = props => {
  const { disabled, title, section, name, template, showAlertEmptyContent, showDashEmptyContent } = props
  const openCommentThreadTarget = useSelector(ReviewState.getOpenThreadTarget)
  const countryIso = useCountryIso()

  return (
    <div className="fra-description">
      <div
        className={
          R.equals(openCommentThreadTarget, [name])
            ? 'fra-description__wrapper fra-row-comments__open'
            : 'fra-description__wrapper'
        }
      >
        <Description
          title={title}
          section={section}
          name={name}
          template={template}
          disabled={disabled}
          showAlertEmptyContent={showAlertEmptyContent}
          showDashEmptyContent={showDashEmptyContent}
        />
      </div>
      <div className="fra-description__review-indicator-wrapper">
        {!disabled && <ReviewIndicator section={section} title={title} target={[name]} countryIso={countryIso} />}
      </div>
    </div>
  )
}

CommentableDescription.defaultProps = {
  disabled: false,
  template: '',
  showAlertEmptyContent: false,
  showDashEmptyContent: false,
}

CommentableDescription.propTypes = {
  disabled: PropTypes.bool,
  title: PropTypes.string.isRequired,
  section: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  template: PropTypes.string,
  showAlertEmptyContent: PropTypes.bool,
  showDashEmptyContent: PropTypes.bool,
}

export default CommentableDescription
