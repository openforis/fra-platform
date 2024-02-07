import React, { PropsWithChildren } from 'react'

import classNames from 'classnames'

import { CommentableDescriptionName, CommentableDescriptionValue } from 'meta/assessment'
import { Topics } from 'meta/messageCenter'

import { useAssessment, useCycle } from 'client/store/assessment'
import { useCountryIso } from 'client/hooks'
import ReviewIndicator from 'client/components/ReviewIndicator'

import Description from './Description'

type Props = PropsWithChildren<{
  disabled?: boolean
  name: CommentableDescriptionName
  sectionName: string
  showAlertEmptyContent?: boolean
  showDashEmptyContent?: boolean
  template?: CommentableDescriptionValue
  title: string
}>

const CommentableDescription: React.FC<Props> = (props) => {
  const { children, disabled, name, sectionName, showAlertEmptyContent, showDashEmptyContent, template, title } = props

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
        >
          {children}
        </Description>
      </div>
      <div className="fra-description__review-indicator-wrapper">
        {!disabled && (
          <ReviewIndicator
            title={title}
            topicKey={Topics.getCommentableDescriptionKey(countryIso, assessment, cycle, sectionName, name)}
          />
        )}
      </div>
    </div>
  )
}

CommentableDescription.defaultProps = {
  disabled: false,
  showAlertEmptyContent: false,
  showDashEmptyContent: false,
  template: { text: '' },
}

export default CommentableDescription
