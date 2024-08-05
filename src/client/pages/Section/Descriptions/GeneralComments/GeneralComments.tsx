import React from 'react'
import { useTranslation } from 'react-i18next'

import { AssessmentNames, CommentableDescriptionName } from 'meta/assessment'

import { useAssessmentRouteParams } from 'client/hooks/useRouteParams'
import CommentableDescription from 'client/pages/Section/Descriptions/CommentableDescription'

const GeneralComments: React.FC = () => {
  const { assessmentName } = useAssessmentRouteParams()

  const isPanEuropean = assessmentName === AssessmentNames.panEuropean

  const { t } = useTranslation()

  return (
    <CommentableDescription
      name={CommentableDescriptionName.generalComments}
      repository
      title={t(isPanEuropean ? 'panEuropean.panEuCommentsTitle' : 'description.generalCommentsTitle')}
    />
  )
}

export default GeneralComments
