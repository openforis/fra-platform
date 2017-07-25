import axios from 'axios'
import { fetchCountryOverviewStatus } from '../navigation/actions'

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
  const api = issueId ? `api/review/${issueId}` : `api/review/${countryIso}/${section}?target=${target}`
  axios.post(api, {msg}).then(() => {
      dispatch({target: target, type: issuePostCommentCompleted, status: 'completed'})
    getIssueSummary(countryIso, section, target)(dispatch)
      fetchCountryOverviewStatus(countryIso)(dispatch)
      axios.get(`api/review/${countryIso}/${section}?target=${target}`)
        .then(sectionCommentsReceived(section, target, dispatch))
    }
  )
}

export const retrieveComments = (countryIso, section, target) => dispatch => {
  dispatch({section: section, type: issueRetrieveCommentsStarted, status: 'started'})
  axios.get(`api/review/${countryIso}/${section}?target=${target}`)
    .then(sectionCommentsReceived(section, target, dispatch))
}

export const getIssueSummary = (countryIso, section, target) => dispatch => {
  axios.get(`api/review/${countryIso}/${section}/summary?target=${target}`)
    .then(resp => {
      dispatch({
        type: issueGetSummaryCompleted,
        section,
        target,
        count: resp.data.count,
        lastCommentUserId: resp.data.lastCommentUserId,
        issueStatus: resp.data.issueStatus
      })
    })
}

export const openCommentThread = (countryIso, section, target, name) => dispatch => {
  retrieveComments(countryIso, section, target)(dispatch)
  dispatch({type: issueOpenCommentThread, target, section, name})
}
export const closeCommentThread = () => ({type: issueCloseCommentThread})

export const markCommentAsDeleted = (countryIso, section, target, commentId) => dispatch =>
  axios
    .delete(`api/review/${countryIso}/comments/${commentId}`)
    .then(() => {
      retrieveComments(countryIso, section, target)(dispatch)
      getIssueSummary(countryIso, section, target)(dispatch)
      fetchCountryOverviewStatus(countryIso)(dispatch)
    })

export const markIssueAsResolved = (countryIso, section, target, issueId, userId) => dispatch => {
  axios.post(`api/issue/markAsResolved?issueId=${issueId}`)
    .then(() => {
      retrieveComments(countryIso, section, target)(dispatch)
      getIssueSummary(countryIso, section, target)(dispatch)
      fetchNavStatus(countryIso)(dispatch)
    })
}
