import {
  resetActivities,
  toggleActivities,
  toggleActivitiesCompareItem,
} from 'client/store/data/history/actions/activities'
import { getDescriptionsHistory } from 'client/store/data/history/actions/getDescriptionsHistory'
import { getOriginalDataPointHistory } from 'client/store/data/history/actions/getOriginalDataPointHistory'
import { getTableDataHistory } from 'client/store/data/history/actions/getTableDataHistory'
import { toggleLastApproved } from 'client/store/data/history/actions/lastApproved'

export const HistoryActions = {
  getDescriptionsHistory,
  getOriginalDataPointHistory,
  getTableDataHistory,
  resetActivities,
  toggleActivities,
  toggleActivitiesCompareItem,
  toggleLastApproved,
}
