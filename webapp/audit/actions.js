import axios from 'axios'
import * as R from 'ramda'
import { applicationError } from '@webapp/loggedin/applicationError/actions'

export const lastSectionUpdateTimestampReceived = 'audit/lastSectionUpdateTimestampReceived'
export const lastAuditFeedReceived = 'audit/lastAuditFeedReceived'

export const fetchLastSectionUpdateTimestamp = (countryIso, section) => async dispatch => {
  try {
    const { data: { timeStamp = null } } = await axios.get(`/api/audit/getLatestAuditLogTimestamp/${countryIso}?section=${section}`)
    dispatch({ type: lastSectionUpdateTimestampReceived, timeStamp })
  } catch (err) {
    dispatch(applicationError(err))
  }
}

export const fetchAuditFeed = (countryIso) => dispatch => {
  axios.get(`/api/audit/getAuditFeed/${countryIso}`)
    .then(resp => dispatch({ type: lastAuditFeedReceived, feed: resp.data.feed }))
    .catch(err => dispatch(applicationError(err)))
}
