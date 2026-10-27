import React from 'react'
import { useTranslation } from 'react-i18next'

import Button from 'client/components/Buttons/Button'
import { IconName } from 'client/components/Icon/types'

import { useCopyValues } from './hooks/useCopyValues'
import { CopyValuesProps } from './types'

const ButtonCopyValues: React.FC<CopyValuesProps> = (props: CopyValuesProps) => {
  const { t } = useTranslation()
  const { onClick, showButton } = useCopyValues(props)

  if (!showButton) return null

  return <Button iconName={IconName.contentCopy} label={t('tableWithOdp.copyToClipboard')} onClick={onClick} />
}

export default ButtonCopyValues
