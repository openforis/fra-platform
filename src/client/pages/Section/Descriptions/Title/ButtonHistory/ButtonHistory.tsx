import React from 'react'
import { useTranslation } from 'react-i18next'

import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import { SectionName } from 'meta/assessment/section'
import { Objects } from 'utils/objects'

import { useHistoryActivities, useHistoryActivitiesIsActive } from 'client/store/data/history/hooks/activities'
import { useHistoryLastApprovedIsActive } from 'client/store/data/history/hooks/lastApproved'
import { useCanViewHistory, useIsDescriptionEditable } from 'client/store/user/hooks/auth'
import Button, { ButtonSize, ButtonType } from 'client/components/Buttons/Button'
import { useSectionContext } from 'client/pages/Section/context'

import { useToggleHistory } from './hooks/useToggleHistory'

type Props = {
  sectionName: SectionName
  target: CommentableDescriptionName
}

const ButtonHistory: React.FC<Props> = (props) => {
  const { target } = props

  const { t } = useTranslation()
  const canViewHistory = useCanViewHistory()
  const { sectionName } = useSectionContext()
  const editable = useIsDescriptionEditable({ sectionName, name: target })
  const loading = false // TODO: useLoading..()

  const historyLastApprovedActive = useHistoryLastApprovedIsActive()
  const historyActivitiesActive = useHistoryActivitiesIsActive()

  const disabled = loading || editable || historyLastApprovedActive

  const onClick = useToggleHistory({ target })

  const isDataSources = target === CommentableDescriptionName.dataSources

  const history = useHistoryActivities()
  // Show toggle button when browsing history for current section
  const currentSectionEnabled = !Objects.isEmpty(history.items?.[target])

  if ((!canViewHistory || !isDataSources) && !currentSectionEnabled) return null

  return (
    <Button
      disabled={disabled}
      iconName="history"
      inverse={!historyActivitiesActive}
      label={t('history.history')}
      onClick={onClick}
      size={ButtonSize.xs}
      type={ButtonType.black}
    />
  )
}

export default ButtonHistory
