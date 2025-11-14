import { createAction } from '@reduxjs/toolkit'

import { ActivityLog } from 'meta/assessment/activityLog'
import { HistoryTarget } from 'meta/cycleData/history/activities'

import { HistoryActivitiesItemState } from 'client/store/data/history/state'

export const toggleActivitiesCompareItem = createAction<{ datum: ActivityLog<never>; target: HistoryTarget }>(
  'data/history/activities/compareItem/toggle'
)

export const resetActivities = createAction<{ datum: ActivityLog<never>; target: HistoryTarget }>(
  'data/history/activities/reset'
)

export const toggleActivities = createAction<HistoryActivitiesItemState>('data/history/activities/toggle')
