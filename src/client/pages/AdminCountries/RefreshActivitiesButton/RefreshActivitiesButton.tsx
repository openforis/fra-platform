import React from 'react'
import { useTranslation } from 'react-i18next'

import { TooltipId } from 'meta/tooltip/id'

import Button, { ButtonSize } from 'client/components/Buttons/Button'
import { IconName } from 'client/components/Icon/types'

type Props = {
  disabled: boolean
  onClick: () => void
}

const RefreshActivitiesButton: React.FC<Props> = (props) => {
  const { disabled, onClick } = props
  const { t } = useTranslation()

  return (
    <Button
      dataTooltipContent={t('landing.recentActivity.refreshTooltip')}
      dataTooltipId={TooltipId.info}
      disabled={disabled}
      iconName={IconName.refresh}
      label={t('landing.recentActivity.refresh')}
      onClick={onClick}
      size={ButtonSize.xs}
    />
  )
}

export default RefreshActivitiesButton
