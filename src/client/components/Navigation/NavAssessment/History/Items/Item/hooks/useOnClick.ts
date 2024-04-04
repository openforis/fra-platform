import { useCallback } from 'react'

import { ActivityLogDescription, CommentableDescriptionName, CommentableDescriptionValue } from 'meta/assessment'
import { Histories } from 'meta/cycleData'

import { useAppDispatch } from 'client/store'
import { DataActions } from 'client/store/data'
import { useSectionRouteParams } from 'client/hooks/useRouteParams'

import { Props } from '../props'

const getTargetValue: {
  [key in CommentableDescriptionName]?: (activityLog: ActivityLogDescription) => CommentableDescriptionValue
} = {
  dataSources: (activityLog: ActivityLogDescription) => {
    return activityLog.target.description.value
  },
}

const statePath: { [key in CommentableDescriptionName]?: (pathParts: Array<string>) => Array<string> } = {
  dataSources: (pathParts: Array<string>) => {
    return ['descriptions', ...pathParts, 'dataSources']
  },
}

export const useOnClick = (props: Props): (() => void) => {
  const { sectionKey } = props
  const dispatch = useAppDispatch()
  const { assessmentName, cycleName, countryIso, sectionName } = useSectionRouteParams()
  return useCallback(() => {
    const { name } = Histories.getHistoryItemKeyParts(sectionKey)
    const path = statePath[name]([assessmentName, cycleName, countryIso, sectionName])
    const value = getTargetValue[name](props.datum)
    dispatch(DataActions.setValue({ path, value }))
  }, [assessmentName, countryIso, cycleName, dispatch, props.datum, sectionKey, sectionName])
}
