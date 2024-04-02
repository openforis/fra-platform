import React from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'

import { Histories } from 'meta/cycleData'

import { useIsHistoryActive } from 'client/store/data'
import { useHistory } from 'client/store/data/hooks/useHistory'
import Button, { ButtonSize } from 'client/components/Buttons/Button'
import { useToggleHistory } from 'client/components/Buttons/ButtonHistory/hooks/useToggleHistory'

type Props = {
  canEdit: boolean
  disabled: boolean
  sectionName: string
  subSection: string
  name: string
  sectionLabelKey: string
}

const ButtonHistory: React.FC<Props> = (props) => {
  const { canEdit, disabled, sectionName, subSection, sectionLabelKey, name } = props

  const { t } = useTranslation()

  const historyActive = useIsHistoryActive()
  const onClick = useToggleHistory({ name, sectionLabelKey, sectionName, subSection })

  const history = useHistory()
  // Show toggle button when browsing history for current section
  const currentSectionEnabled = !Objects.isEmpty(
    history.items?.[Histories.getHistoryItemSectionKey(sectionName, subSection, name)]
  )

  if (!canEdit && !currentSectionEnabled) return null

  return (
    <Button
      disabled={disabled}
      inverse={!historyActive}
      label={historyActive ? t('description.done') : t('common.history')}
      onClick={onClick}
      size={ButtonSize.xs}
    />
  )
}

export default ButtonHistory
