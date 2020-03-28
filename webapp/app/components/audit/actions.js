import axios from 'axios'

import * as UserState from '@webapp/user/userState'

export const lastSectionUpdateTimestampReceived = 'audit/lastSectionUpdateTimestampReceived'
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

export const resetSectionUpdateTimestamp = () => ({ type: lastSectionUpdateTimestampReceived, timeStamp: null })

export const fetchAuditFeed = countryIso => async dispatch => {
  const {
    data: { feed },
  } = await axios.get(`/api/audit/getAuditFeed/${countryIso}`)
  dispatch({ type: lastAuditFeedReceived, feed })
}
