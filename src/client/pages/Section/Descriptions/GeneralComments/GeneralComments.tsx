import React from 'react'
import { useTranslation } from 'react-i18next'

import { AssessmentNames } from 'meta/assessment'

import CommentableDescription from '../CommentableDescription'

type Props = {
  assessmentName: string
  sectionName: string
  disabled: boolean
}

const GeneralComments: React.FC<Props> = (props) => {
  const { assessmentName, sectionName, disabled } = props
  const isPanEuropean = assessmentName === AssessmentNames.panEuropean

  const { t } = useTranslation()

  return (
    <div className="fra-description__container">
      <CommentableDescription
        sectionName={sectionName}
        title={t(isPanEuropean ? 'panEuropean.panEuCommentsTitle' : 'description.generalCommentsTitle')}
        name="generalComments"
        disabled={disabled}
      />
    </div>
  )
}

export default GeneralComments
