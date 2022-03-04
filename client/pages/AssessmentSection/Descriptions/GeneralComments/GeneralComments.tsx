import React from 'react'

import { useTranslation } from 'react-i18next'
import CommentableDescription from '../CommentableDescription'

type Props = {
  section: string
  disabled: boolean
}

const GeneralComments: React.FC<Props> = (props) => {
  const { section, disabled } = props

  const { i18n } = useTranslation()

  return (
    <div className="fra-description__container">
      <CommentableDescription
        section={section}
        title={i18n.t('description.generalCommentsTitle')}
        name="generalComments"
        disabled={disabled}
      />
    </div>
  )
}

export default GeneralComments
