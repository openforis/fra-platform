import { Dispatch, SetStateAction, useCallback } from 'react'

import { ColName } from 'meta/assessment/col'

import { SortOrder, SortState } from './types'

interface Props {
  setSortState: Dispatch<SetStateAction<SortState>>
}

export const useHandleSort = (props: Props): ((colName: ColName) => void) => {
  const { setSortState } = props

  const handleSort = useCallback(
    (colName: ColName) => {
      setSortState((prevState) => {
        const isNextState = prevState.colName === colName

        if (!isNextState) return { colName, order: SortOrder.ASC }

        const stateTransitions: Record<SortOrder, SortState> = {
          [SortOrder.ASC]: { colName, order: SortOrder.DESC },
          [SortOrder.DESC]: { colName: null, order: SortOrder.NONE },
          [SortOrder.NONE]: { colName, order: SortOrder.ASC },
        }

        return stateTransitions[prevState.order]
      })
    },
    [setSortState]
  )

  return handleSort
}
