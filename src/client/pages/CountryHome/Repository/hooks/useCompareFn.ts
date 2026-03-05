import { useMemo } from 'react'

import { Assessments } from 'meta/assessment/assessments'
import { CycleUuid } from 'meta/assessment/cycle'
import { Cycles } from 'meta/assessment/cycles'
import { RepositoryItem } from 'meta/cycleData/repository/item'
import { TablePaginatedCompareFn } from 'meta/tablePaginated/compareFn'

import { useAssessment } from 'client/store/meta/hooks/assessments'

export const useCompareFn = (): TablePaginatedCompareFn<RepositoryItem> => {
  const assessment = useAssessment()

  return useMemo<TablePaginatedCompareFn<RepositoryItem>>(
    () =>
      (a: RepositoryItem, b: RepositoryItem): number =>
        Cycles.compareByDateCreated(
          Assessments.getCycle({ assessment, cycleUuid: a.cycleUuid as CycleUuid }),
          Assessments.getCycle({ assessment, cycleUuid: b.cycleUuid as CycleUuid })
        ),
    [assessment]
  )
}
