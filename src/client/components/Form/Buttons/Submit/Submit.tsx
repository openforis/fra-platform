import React from 'react'
import { useTranslation } from 'react-i18next'

interface SubmitProps {
  disabled?: boolean
  isDirty?: boolean
  isSubmitting?: boolean
}

const Submit: React.FC<SubmitProps> = (props) => {
  const { disabled, isDirty, isSubmitting } = props
  const { t } = useTranslation()

  if (disabled) return null

  return (
    <button className="btn btn-primary" disabled={!isDirty || isSubmitting} type="submit">
      {isSubmitting ? t('common.submitting') : t('common.submit')}
    </button>
  )
}

export default Submit
