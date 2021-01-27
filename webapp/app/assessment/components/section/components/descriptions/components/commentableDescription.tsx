import React from 'react'
import { useSelector } from 'react-redux'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'ramd... Remove this comment to see the full error message
import * as R from 'ramda'

import ReviewIndicator from '@webapp/app/assessment/components/review/reviewIndicator'
import useCountryIso from '@webapp/components/hooks/useCountryIso'

import * as ReviewState from '@webapp/app/assessment/components/review/reviewState'

import Description from './description'

type OwnProps = {
  disabled?: boolean
  title: string
  section: string
  name: string
  template?: string
  showAlertEmptyContent?: boolean
  showDashEmptyContent?: boolean
}

// @ts-expect-error ts-migrate(2456) FIXME: Type alias 'Props' circularly references itself.
type Props = OwnProps & typeof CommentableDescription.defaultProps

// @ts-expect-error ts-migrate(7022) FIXME: 'CommentableDescription' implicitly has type 'any'... Remove this comment to see the full error message
const CommentableDescription = (props: Props) => {
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
        {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ section: any; title: any; target: any[]; c... Remove this comment to see the full error message */}
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

export default CommentableDescription
