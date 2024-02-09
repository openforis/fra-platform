import React from 'react'
import { useTranslation } from 'react-i18next'

import { AssessmentNames, CommentableDescriptionName } from 'meta/assessment'

import CommentableDescription from '../CommentableDescription'

type Props = {
  assessmentName: string
  sectionName: string
}

const GeneralComments: React.FC<Props> = (props) => {
  const { assessmentName, sectionName } = props
  const isPanEuropean = assessmentName === AssessmentNames.panEuropean

  const { t } = useTranslation()

  return (
    <CommentableDescription
      name={CommentableDescriptionName.generalComments}
      sectionName={sectionName}
      title={t(isPanEuropean ? 'panEuropean.panEuCommentsTitle' : 'description.generalCommentsTitle')}
    />
  )
}

export default GeneralComments
