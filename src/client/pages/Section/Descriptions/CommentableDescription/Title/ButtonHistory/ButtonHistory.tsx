import React from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'

import { CommentableDescriptionName } from 'meta/assessment'
import { Histories } from 'meta/cycleData'

import { useIsHistoryActive } from 'client/store/data'
import { useHistory } from 'client/store/data/hooks/useHistory'
import { useCanViewHistory, useIsDescriptionEditable } from 'client/store/user/hooks'
import Button, { ButtonSize, ButtonType } from 'client/components/Buttons/Button'
import { useSectionContext } from 'client/pages/Section/context'

import { useToggleHistory } from './hooks/useToggleHistory'

type Props = {
  name: CommentableDescriptionName
}

const ButtonHistory: React.FC<Props> = (props) => {
  const { name } = props

  const { t } = useTranslation()
  const canViewHistory = useCanViewHistory()
  const { sectionName } = useSectionContext()
  const editable = useIsDescriptionEditable({ sectionName, name })
  const loading = false // TODO: useLoading..()
  const disabled = loading || editable

  const historyActive = useIsHistoryActive()
  const onClick = useToggleHistory({ name, sectionName })

  const isDataSources = name === CommentableDescriptionName.dataSources

  const history = useHistory()
  // Show toggle button when browsing history for current section
  const currentSectionEnabled = !Objects.isEmpty(history.items?.[Histories.getHistoryItemSectionKey(sectionName, name)])

  if ((!canViewHistory || !isDataSources) && !currentSectionEnabled) return null

  return (
    <Button
      disabled={disabled}
      iconName="history"
      inverse={!historyActive}
      label={t('common.history')}
      onClick={onClick}
      size={ButtonSize.xs}
      type={ButtonType.blackMap}
    />
  )
}

export default ButtonHistory
