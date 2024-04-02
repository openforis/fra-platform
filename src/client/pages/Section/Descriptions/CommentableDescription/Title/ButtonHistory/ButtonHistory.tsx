import React from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'

import { CommentableDescriptionName } from 'meta/assessment'
import { Histories } from 'meta/cycleData'

import { useIsHistoryActive } from 'client/store/data'
import { useHistory } from 'client/store/data/hooks/useHistory'
import { useCanEditDescription, useIsDescriptionEditable } from 'client/store/user/hooks'
import Button, { ButtonSize } from 'client/components/Buttons/Button'

import { useToggleHistory } from './hooks/useToggleHistory'

type Props = { sectionName: string; name: CommentableDescriptionName }

const ButtonHistory: React.FC<Props> = (props) => {
  const { sectionName, name } = props

  const { t } = useTranslation()
  const canEdit = useCanEditDescription({ sectionName })
  const descriptionEditable = useIsDescriptionEditable({ sectionName, name })
  const loading = false // TODO: useLoading..()
  const disabled = loading || descriptionEditable

  const historyActive = useIsHistoryActive()
  const onClick = useToggleHistory({ name, sectionName })

  const isDataSources = name === CommentableDescriptionName.dataSources

  const history = useHistory()
  // Show toggle button when browsing history for current section
  const currentSectionEnabled = !Objects.isEmpty(history.items?.[Histories.getHistoryItemSectionKey(sectionName, name)])

  if ((!canEdit || !isDataSources) && !currentSectionEnabled) return null

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
