import React from 'react'

import { Objects } from '@core/utils'

import ReviewIndicator from '@client/components/ReviewIndicator'

import Description from '../Description'

type Props = {
  disabled?: boolean
  title: string
  section: string
  name: string
  template?: string
  showAlertEmptyContent?: boolean
  showDashEmptyContent?: boolean
}

const CommentableDescription: React.FC<Props> = (props) => {
  const { disabled, title, section, name, template, showAlertEmptyContent, showDashEmptyContent } = props

  const openCommentThreadTarget = '' // TODO: useSelector(ReviewState.getOpenThreadTarget)

  return (
    <div className="fra-description">
      <div
        className={
          Objects.isEqual(openCommentThreadTarget, [name])
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
        {!disabled && <ReviewIndicator title={title} topicKey={name} />}
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
