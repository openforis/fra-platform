import axios from 'axios'

import * as UserState from '@webapp/store/user/userState'

export const lastSectionUpdateTimestampReceived = 'audit/lastSectionUpdate/timestamp/received'
export const lastSectionUpdateTimestampReset = 'audit/lastSectionUpdate/timestamp/reset'
export const lastAuditFeedReceived = 'audit/lastAuditFeedReceived'

export const fetchLastSectionUpdateTimestamp = (countryIso, section) => async (dispatch, getState) => {
  const userInfo = UserState.getUserInfo(getState())
  if (userInfo) {
    const {
      data: { timeStamp = null },
    } = await axios.get(`/api/audit/getLatestAuditLogTimestamp/${countryIso}?section=${section}`)
    dispatch({ type: lastSectionUpdateTimestampReceived, timeStamp })
  }
}

export const resetSectionUpdateTimestamp = () => ({ type: lastSectionUpdateTimestampReset })

export const fetchAuditFeed = (countryIso) => async (dispatch) => {
  const {
    data: { feed },
  } = await axios.get(`/api/audit/getAuditFeed/${countryIso}`)
  dispatch({ type: lastAuditFeedReceived, feed })
}
