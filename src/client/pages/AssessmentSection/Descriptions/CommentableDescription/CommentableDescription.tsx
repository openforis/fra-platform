import React from 'react'

import classNames from 'classnames'

import { CommentableDescriptionValue } from 'meta/assessment'
import { Topics } from 'meta/messageCenter'

import { useAssessment, useCycle } from 'client/store/assessment'
import { useCountryIso } from 'client/hooks'
import ReviewIndicator from 'client/components/ReviewIndicator'

import Description from './Description'

type Props = {
  disabled?: boolean
  title: string
  sectionName: string
  name: string
  template?: CommentableDescriptionValue
  showAlertEmptyContent?: boolean
  showDashEmptyContent?: boolean
}

const CommentableDescription: React.FC<Props> = (props) => {
  const { disabled, title, sectionName, name, template, showAlertEmptyContent, showDashEmptyContent } = props
  const countryIso = useCountryIso()
  const assessment = useAssessment()
  const cycle = useCycle()

  return (
    <div className="fra-description">
      <div className={classNames('fra-description__wrapper')}>
        <Description
          title={title}
          sectionName={sectionName}
          name={name}
          template={template}
          disabled={disabled}
          showAlertEmptyContent={showAlertEmptyContent}
          showDashEmptyContent={showDashEmptyContent}
        />
      </div>
      <div className="fra-description__review-indicator-wrapper">
        {!disabled && (
          <ReviewIndicator title={title} topicKey={Topics.getCommentableDescriptionKey(countryIso, assessment, cycle, sectionName, name)} />
        )}
      </div>
    </div>
  )
}

CommentableDescription.defaultProps = {
  disabled: false,
  template: { text: '' },
  showAlertEmptyContent: false,
  showDashEmptyContent: false,
}

export default CommentableDescription
