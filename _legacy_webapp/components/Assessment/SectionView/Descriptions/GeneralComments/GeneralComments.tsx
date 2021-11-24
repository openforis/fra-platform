import React from 'react'

import { useI18n } from '../../../../../hooks'

import CommentableDescription from '../CommentableDescription'

type Props = {
  section: string
  disabled: boolean
}

const GeneralComments: React.FC<Props> = (props) => {
  const { section, disabled } = props

  const i18n = useI18n()

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
