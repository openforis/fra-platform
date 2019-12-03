import axios from 'axios'
import * as R from 'ramda'
import { applicationError } from '../applicationError/actions'

export const lastSectionUpdateTimestampReceived = 'audit/lastSectionUpdateTimestampReceived'
export const lastAuditFeedReceived = 'audit/lastAuditFeedReceived'

export const fetchLastSectionUpdateTimestamp = (countryIso, section) => dispatch => {
  axios.get(`/api/audit/getLatestAuditLogTimestamp/${countryIso}?section=${section}`)
    .then(resp => {
      if (!R.isNil(resp.data.timeStamp)) { //There might not be any changes yet for the section
        dispatch({type: lastSectionUpdateTimestampReceived, timeStamp: resp.data.timeStamp})
      }
    })
    .catch(err => dispatch(applicationError(err)))
}

export const fetchAuditFeed = (countryIso) => dispatch => {
  axios.get(`/api/audit/getAuditFeed/${countryIso}`)
    .then(resp => dispatch({type: lastAuditFeedReceived, feed: resp.data.feed}))
    .catch(err => dispatch(applicationError(err)))
}
