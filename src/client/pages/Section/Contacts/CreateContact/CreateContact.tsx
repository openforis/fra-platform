import React from 'react'
import { useTranslation } from 'react-i18next'

import Button, { ButtonSize } from 'client/components/Buttons/Button'

import { useOnClick } from './hooks/useOnClick'

const CreateContact: React.FC = () => {
  const { t } = useTranslation()
  const { onClick, loading } = useOnClick()

  return (
    <div>
      <Button disabled={loading} iconName="small-add" label={t('common.add')} onClick={onClick} size={ButtonSize.m} />
    </div>
  )
}

export default CreateContact
