import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { useIsAreaSelectorExpanded } from 'client/store/ui/areaSelector/hooks/areaSelector'
import { AreaSelectorSortBy } from 'client/store/ui/areaSelector/state'

export type HeaderConfig = { label: string; sortBy: AreaSelectorSortBy }

export const useHeaders = (): Array<HeaderConfig> => {
  const { t } = useTranslation()
  const expanded = useIsAreaSelectorExpanded()

  return useMemo<Array<HeaderConfig>>(() => {
    if (expanded) {
      return [
        { label: t('audit.edited'), sortBy: 'lastEdit' },
        { label: t('common.submittedToReview'), sortBy: 'lastInReview' },
        { label: t('common.submittedForApproval'), sortBy: 'lastInApproval' },
        { label: t('common.accepted'), sortBy: 'lastInAccepted' },
      ]
    }
    return [{ label: t('common.updated'), sortBy: 'lastUpdate' }]
  }, [expanded, t])
}
