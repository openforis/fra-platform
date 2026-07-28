import React from 'react'
import { useTranslation } from 'react-i18next'

import Button, { ButtonSize } from 'client/components/Buttons/Button'

import { useOnClick } from './hooks/useOnClick'

const CreateContact: React.FC = () => {
  const { t } = useTranslation()
  const { loading, onClick } = useOnClick()

  return (
    <div>
      <Button disabled={loading} iconName="small-add" label={t('common.add')} onClick={onClick} size={ButtonSize.xs} />
    </div>
  )
}

export default CreateContact
