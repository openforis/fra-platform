import React from 'react'
import { useTranslation } from 'react-i18next'

import CommentableDescription from '../CommentableDescription'

type Props = {
  sectionName: string
  disabled: boolean
}

const GeneralComments: React.FC<Props> = (props) => {
  const { sectionName, disabled } = props

  const { i18n } = useTranslation()

  return (
    <div className="fra-description__container">
      <CommentableDescription
        sectionName={sectionName}
        title={i18n.t<string>('description.generalCommentsTitle')}
        name="generalComments"
        disabled={disabled}
      />
    </div>
  )
}

export default GeneralComments
