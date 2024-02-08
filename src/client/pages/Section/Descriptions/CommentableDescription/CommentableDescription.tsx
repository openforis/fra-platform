import React, { PropsWithChildren } from 'react'

import classNames from 'classnames'

import { CommentableDescriptionName, CommentableDescriptionValue } from 'meta/assessment'
import { Topics } from 'meta/messageCenter'

import { useAssessment, useCycle } from 'client/store/assessment'
import { useIsDescriptionEditable } from 'client/store/user/hooks'
import { useCountryIso } from 'client/hooks'
import ReviewIndicator from 'client/components/ReviewIndicator'

import Description from './Description'

type Props = PropsWithChildren<{
  name: CommentableDescriptionName
  sectionName: string
  showAlertEmptyContent?: boolean
  showDashEmptyContent?: boolean
  template?: CommentableDescriptionValue
  title: string
}>

const CommentableDescription: React.FC<Props> = (props) => {
  const { children, name, sectionName, showAlertEmptyContent, showDashEmptyContent, template, title } = props

  const countryIso = useCountryIso()
  const assessment = useAssessment()
  const cycle = useCycle()
  const editable = useIsDescriptionEditable({ sectionName, name })

  return (
    <div className="fra-description">
      <div className={classNames('fra-description__wrapper')}>
        <Description
          title={title}
          sectionName={sectionName}
          name={name}
          template={template}
          showAlertEmptyContent={showAlertEmptyContent}
          showDashEmptyContent={showDashEmptyContent}
        >
          {children}
        </Description>
      </div>
      <div className="fra-description__review-indicator-wrapper">
        {!editable && (
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
  showAlertEmptyContent: false,
  showDashEmptyContent: false,
  template: { text: '' },
}

export default CommentableDescription
