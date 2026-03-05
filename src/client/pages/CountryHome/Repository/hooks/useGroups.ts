import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Assessments } from 'meta/assessment/assessments'
import { CycleUuid } from 'meta/assessment/cycle'
import { RepositoryItem } from 'meta/cycleData/repository/item'

import { useAssessment } from 'client/store/meta/hooks/assessments'
import { useCycle } from 'client/store/meta/hooks/cycles'
import { Props } from 'client/components/TablePaginated/types'

// RepositoryItem contains cycleUuid
// Group items by cycle and collapse other than current cycle
export const useGroups = (): Props<RepositoryItem>['groups'] => {
  const { t } = useTranslation()
  const assessment = useAssessment()
  const currentCycle = useCycle()

  return useMemo(
    () => ({
      headerLabel: (cycleUuid: CycleUuid): string => {
        const cycle = Assessments.getCycle({ assessment, cycleUuid })
        return t(Assessments.getCycleTranslationKey({ cycleName: cycle.name }))
      },
      initialCollapsed: (cycleUuid: PropertyKey): boolean => cycleUuid !== currentCycle?.uuid,
      keySelector: (item: RepositoryItem): string => item.cycleUuid ?? '',
    }),
    [assessment, currentCycle, t]
  )
}
