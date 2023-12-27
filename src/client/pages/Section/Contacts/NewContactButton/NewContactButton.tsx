import React from 'react'
import { useTranslation } from 'react-i18next'

import Icon from 'client/components/Icon'

import { useOnClick } from './hooks/useOnClick'

type Props = {
  canEdit: boolean
}

const NewContactButton: React.FC<Props> = (props: Props) => {
  const { canEdit } = props
  const { t } = useTranslation()
  const { onClick, loading } = useOnClick()

  if (!canEdit) return null

  return (
    <div className="contacts__button-add-container">
      <button
        disabled={loading}
        className="btn btn-primary no-print contacts__button-add"
        onClick={onClick}
        type="button"
      >
        <Icon className="icon-sub icon-white" name="small-add" />
        {t('review.add')}
      </button>
    </div>
  )
}

export default NewContactButton
