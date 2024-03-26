import { useCallback } from 'react'

import { CommentableDescriptionName, SectionName } from 'meta/assessment'
import { Histories } from 'meta/cycleData'

import { useAppDispatch } from 'client/store'
import { DataActions } from 'client/store/data'

type Returned = () => void

type UseToggleHistoryParams = {
  name: CommentableDescriptionName
  sectionName: SectionName
}

export const useToggleHistory = (props: UseToggleHistoryParams): Returned => {
  const { name, sectionName } = props
  const dispatch = useAppDispatch()

  return useCallback(() => {
    const sectionLabelKey = 'description.dataSourcesPlus'
    const sectionKey = Histories.getHistoryItemSectionKey(sectionName, name)

    dispatch(DataActions.toggleHistory({ sectionLabelKey, sectionKey }))
  }, [dispatch, name, sectionName])
}
