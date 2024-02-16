import React from 'react'
import { useTranslation } from 'react-i18next'

import { AssessmentNames, CommentableDescriptionName, SectionName } from 'meta/assessment'

import { useAssessmentRouteParams } from 'client/hooks/useRouteParams'
import CommentableDescription from 'client/pages/Section/Descriptions/CommentableDescription'

type Props = {
  sectionName: SectionName
}

const GeneralComments: React.FC<Props> = (props) => {
  const { sectionName } = props

  const { assessmentName } = useAssessmentRouteParams()

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
