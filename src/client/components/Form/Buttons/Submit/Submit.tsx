import React from 'react'
import { useTranslation } from 'react-i18next'

import Button, { ButtonSize } from 'client/components/Buttons/Button'

interface SubmitProps {
  disabled?: boolean
  isDirty?: boolean
  isSubmitting?: boolean
}

const Submit: React.FC<SubmitProps> = (props) => {
  const { disabled, isDirty, isSubmitting } = props

  const { t } = useTranslation()

  const label = t('common.submit')

  if (disabled) return null

  return <Button disabled={!isDirty || isSubmitting} htmlButtonType="submit" label={label} size={ButtonSize.l} />
}

export default Submit
