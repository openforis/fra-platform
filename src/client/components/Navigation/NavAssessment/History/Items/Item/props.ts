import { ActivityLog } from 'meta/assessment'
import { HistoryItemSectionKey } from 'meta/cycleData'

export type Props = {
  datum: ActivityLog<never>
  sectionKey: HistoryItemSectionKey
}
