import { ActivityLog } from 'meta/assessment/activityLog'
import { HistoryTarget } from 'meta/cycleData/historyActivities'

export type Props = {
  datum: ActivityLog<never>
  target: HistoryTarget
}
