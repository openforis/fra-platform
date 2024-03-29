import { useCallback } from 'react'

import { SectionName } from 'meta/assessment'
import { Histories } from 'meta/cycleData'

import { useAppDispatch } from 'client/store'
import { DataActions } from 'client/store/data'

type Returned = () => void

type UseToggleHistoryParams = {
  name: string
  sectionLabelKey: string
  sectionName: SectionName
  subSection: string
}

export const useToggleHistory = (props: UseToggleHistoryParams): Returned => {
  const { name, sectionLabelKey, subSection, sectionName } = props
  const dispatch = useAppDispatch()

  return useCallback(() => {
    const sectionKey = Histories.getHistoryItemSectionKey(sectionName, subSection, name)

    dispatch(DataActions.toggleHistory({ sectionLabelKey, sectionKey }))
  }, [dispatch, name, sectionLabelKey, sectionName, subSection])
}
