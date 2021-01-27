import React from 'react'
import CommentableDescription from '@webapp/app/assessment/components/section/components/descriptions/components/commentableDescription'
import useI18n from '@webapp/components/hooks/useI18n'

type Props = {
  section: string
  disabled: boolean
}
const GeneralComments = (props: Props) => {
  const { section, disabled } = props
  const i18n = useI18n()
  return (
    <div className="fra-description__container">
      <CommentableDescription
        section={section}
        title={(i18n as any).t('description.generalCommentsTitle')}
        name="generalComments"
        disabled={disabled}
      />
    </div>
  )
}
export default GeneralComments
