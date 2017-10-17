import axios from 'axios'
import { applicationError } from '../applicationError/actions'

export const lastSectionUpdateTimestampReceived = 'audit/lastSectionUpdateTimestampReceived'

export const fetchLastSectionUpdateTimestamp = (countryIso, section) => dispatch => {
  axios.get(`/api/audit/getLatestAuditLogTimestamp/${countryIso}?section=${section}`)
    .then(resp => dispatch({type: lastSectionUpdateTimestampReceived, timeStamp: resp.data.timeStamp}))
    .catch(err => dispatch(applicationError(err)))
}
