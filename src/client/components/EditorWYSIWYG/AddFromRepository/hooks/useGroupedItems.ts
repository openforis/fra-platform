import { useMemo } from 'react'

import { Assessments } from 'meta/assessment/assessments'
import { Cycles } from 'meta/assessment/cycles'
import { RepositoryItem } from 'meta/cycleData/repository/item'

import { useAssessment } from 'client/store/meta/hooks/assessments'

export const useGroupedItems = (items: Array<RepositoryItem> | undefined): Array<[string, Array<RepositoryItem>]> => {
  const assessment = useAssessment()

  return useMemo(() => {
    // First load
    if (!items) return []

    // Group by cycle uuid
    const grouped = Object.groupBy(items, (item) => item.cycleUuid ?? '')
    const entries = Object.entries(grouped).filter(([uuid]) => uuid !== '')

    // sort cycles from newest to oldest
    return entries.sort(([uuidA], [uuidB]): number =>
      Cycles.compareByDateCreated(
        Assessments.getCycle({ assessment, cycleUuid: uuidA }),
        Assessments.getCycle({ assessment, cycleUuid: uuidB })
      )
    )
  }, [assessment, items])
}
