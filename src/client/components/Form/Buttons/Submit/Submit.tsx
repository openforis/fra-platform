import React from 'react'
import { useTranslation } from 'react-i18next'

interface SubmitProps {
  disabled?: boolean
  isSubmitting?: boolean
}

const Submit: React.FC<SubmitProps> = (props) => {
  const { disabled = false, isSubmitting = false } = props
  const { t } = useTranslation()

  return (
    <button className="btn btn-primary" disabled={disabled || isSubmitting} type="submit">
      {isSubmitting ? t('common.submitting') : t('common.submit')}
    </button>
  )
}

export default Submit
