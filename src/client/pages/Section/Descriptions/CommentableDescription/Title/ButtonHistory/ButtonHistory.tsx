import React from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'

import { CommentableDescriptionName } from 'meta/assessment'

import { useIsHistoryActive } from 'client/store/data'
import { useHistory } from 'client/store/data/hooks/useHistory'
import { useCanViewHistory, useIsDescriptionEditable } from 'client/store/user/hooks'
import Button, { ButtonSize, ButtonType } from 'client/components/Buttons/Button'
import { useSectionContext } from 'client/pages/Section/context'

import { useToggleHistory } from './hooks/useToggleHistory'

type Props = {
  target: CommentableDescriptionName
}

const ButtonHistory: React.FC<Props> = (props) => {
  const { target } = props

  const { t } = useTranslation()
  const canViewHistory = useCanViewHistory()
  const { sectionName } = useSectionContext()
  const editable = useIsDescriptionEditable({ sectionName, name: target })
  const loading = false // TODO: useLoading..()
  const disabled = loading || editable

  const historyActive = useIsHistoryActive()
  const onClick = useToggleHistory({ target })

  const isDataSources = target === CommentableDescriptionName.dataSources

  const history = useHistory()
  // Show toggle button when browsing history for current section
  const currentSectionEnabled = !Objects.isEmpty(history.items?.[target])

  if ((!canViewHistory || !isDataSources) && !currentSectionEnabled) return null

  return (
    <Button
      disabled={disabled}
      iconName="history"
      inverse={!historyActive}
      label={t('common.history')}
      onClick={onClick}
      size={ButtonSize.xs}
      type={ButtonType.black}
    />
  )
}

export default ButtonHistory
