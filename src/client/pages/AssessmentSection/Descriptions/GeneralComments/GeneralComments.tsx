import React from 'react'
import { useTranslation } from 'react-i18next'

import CommentableDescription from '../CommentableDescription'

type Props = {
  assessmentName: string
  sectionName: string
  disabled: boolean
}

const GeneralComments: React.FC<Props> = (props) => {
  const { assessmentName, sectionName, disabled } = props
  const isPanEuropean = assessmentName === 'panEuropean'

  const { i18n } = useTranslation()

  return (
    <div className="fra-description__container">
      <CommentableDescription
        sectionName={sectionName}
        title={i18n.t<string>(isPanEuropean ? 'description.panEuCommentsTitle' : 'description.generalCommentsTitle')}
        name="generalComments"
        disabled={disabled}
      />
    </div>
  )
}

export default GeneralComments
