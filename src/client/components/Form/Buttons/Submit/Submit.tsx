import React from 'react'
import { useTranslation } from 'react-i18next'

import Button, { ButtonSize } from 'client/components/Buttons/Button'
import { FormDefinitionLabels } from 'client/components/Form/types'

interface SubmitProps {
  disabled?: boolean
  isDirty?: boolean
  isSubmitting?: boolean
  label?: FormDefinitionLabels['submit']
}

const Submit: React.FC<SubmitProps> = (props) => {
  const { disabled, isDirty, isSubmitting, label } = props

  const { t } = useTranslation()

  if (disabled) return null

  return (
    <Button
      disabled={!isDirty || isSubmitting}
      htmlButtonType="submit"
      label={label ?? t('common.submit')}
      size={ButtonSize.l}
    />
  )
}

export default Submit
