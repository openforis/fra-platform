import React from 'react'
import { useTranslation } from 'react-i18next'

import { useIsOriginalDataPointUpdating } from 'client/store/data/originalDataPoint/hooks/originalDataPoint'
import { useIsPrintRoute } from 'client/hooks/routes'
import Button, { ButtonSize } from 'client/components/Buttons/Button'

import { useOnClick } from './hooks/useOnClick'

type Props = {
  canEditData: boolean
}

const CreateNationalClass: React.FC<Props> = (props) => {
  const { canEditData } = props

  const { t } = useTranslation()
  const { print } = useIsPrintRoute()
  const originalDataPointUpdating = useIsOriginalDataPointUpdating()
  const onClick = useOnClick()

  if (!canEditData || print) {
    return null
  }

  return (
    <Button
      disabled={originalDataPointUpdating}
      iconName="small-add"
      label={t('common.add')}
      onClick={onClick}
      size={ButtonSize.m}
    />
  )
}

export default CreateNationalClass
