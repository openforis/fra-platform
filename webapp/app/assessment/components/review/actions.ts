import axios from 'axios'
import { applicationError } from '../../../../components/error/actions'
import { fetchCountryOverviewStatus } from '../../../country/actions'

export const issuePostCommentCompleted = 'issue/comment/post/completed'
export const issueRetrieveCommentsStarted = 'issue/comment/retrieve/started'
export const issueRetrieveCommentsCompleted = 'issue/comment/retrieve/completed'
export const issueOpenCommentThread = 'issue/comment/thread/open'
export const issueCloseCommentThread = 'issue/comment/thread/close'

export const issueGetSummaryCompleted = 'issue/summary/completed'

const sectionCommentsReceived = (section, target, dispatch) => resp => {
  const targetkey = typeof target === 'string' ? target : target.join(',')
  dispatch({
    type: issueRetrieveCommentsCompleted,
    section: section,
    target: targetkey,
    issue: resp.data
  })
}

export const postComment = (issueId, countryIso, section, target, userId, msg) => dispatch => {
  const api = issueId ? `/api/review/${issueId}` : `/api/review/${countryIso}/${section}?target=${target}`
  axios.post(api, {msg}).then(() => {
      dispatch({target: target, type: issuePostCommentCompleted, status: 'completed'})
      dispatch(getIssueSummary(countryIso, section, target))
      dispatch(fetchCountryOverviewStatus(countryIso))
      axios.get(`/api/review/${countryIso}/${section}?target=${target}`)
        .then(sectionCommentsReceived(section, target, dispatch))
        .catch(err => dispatch(applicationError(err)))
    }
  )
  .catch(err => dispatch(applicationError(err)))
}

export const retrieveComments = (countryIso, section, target) => dispatch => {
  dispatch({section: section, type: issueRetrieveCommentsStarted, status: 'started'})
  axios.get(`/api/review/${countryIso}/${section}?target=${target}`)
    .then(sectionCommentsReceived(section, target, dispatch))
}

export const getIssueSummary = (countryIso, section, target) => dispatch => {
  axios.get(`/api/review/${countryIso}/${section}/summary?target=${target}`)
    .then(resp => {
      dispatch({
        type: issueGetSummaryCompleted,
        section,
        target,
        issuesCount: resp.data.issuesCount,
        lastCommentUserId: resp.data.lastCommentUserId,
        issueStatus: resp.data.issueStatus,
        hasUnreadIssues: resp.data.hasUnreadIssues
      })
    })
}

export const openCommentThread = (countryIso, section, target, title) => dispatch => {
  dispatch(retrieveComments(countryIso, section, target))
  dispatch({type: issueOpenCommentThread, target, section, title})
}
export const closeCommentThread = (countryIso, section, target) => dispatch => {
  dispatch(getIssueSummary(countryIso, section, target))
  dispatch(fetchCountryOverviewStatus(countryIso))
  dispatch({type: issueCloseCommentThread})
}

export const markCommentAsDeleted = (countryIso, section, target, commentId) => dispatch =>
  axios
    .delete(`/api/review/${countryIso}/comments/${commentId}`)
    .then(() => {
      dispatch(retrieveComments(countryIso, section, target))
      dispatch(getIssueSummary(countryIso, section, target))
      dispatch(fetchCountryOverviewStatus(countryIso))
    })
    .catch(err => dispatch(applicationError(err)))


export const markIssueAsResolved = (countryIso, section, target, issueId) => dispatch => {
  axios.post(`/api/issue/markAsResolved?issueId=${issueId}`)
    .then(() => {
      dispatch(retrieveComments(countryIso, section, target))
      dispatch(getIssueSummary(countryIso, section, target))
      dispatch(fetchCountryOverviewStatus(countryIso))
    })
    .catch(err => dispatch(applicationError(err)))

}
