import axios from 'axios'
import { ApiEndPoint } from '@common/api/endpoint'
import { CountryActions } from '../../../../store/country'
import { applicationError } from '../../../../components/error/actions'

export const issuePostCommentCompleted = 'issue/comment/post/completed'
export const issueRetrieveCommentsStarted = 'issue/comment/retrieve/started'
export const issueRetrieveCommentsCompleted = 'issue/comment/retrieve/completed'
export const issueOpenCommentThread = 'issue/comment/thread/open'
export const issueCloseCommentThread = 'issue/comment/thread/close'

export const issueGetSummaryCompleted = 'issue/summary/completed'

const sectionCommentsReceived = (section: any, target: any, dispatch: any) => (resp: any) => {
  const targetkey = typeof target === 'string' ? target : target.join(',')
  dispatch({
    type: issueRetrieveCommentsCompleted,
    section,
    target: targetkey,
    issue: resp.data,
  })
}

export const getIssueSummary = (countryIso: any, section: any, target: any) => (dispatch: any) => {
  axios.get(`${ApiEndPoint.Review.getSummary(countryIso, section)}?target=${target}`).then((resp) => {
    dispatch({
      type: issueGetSummaryCompleted,
      section,
      target,
      issuesCount: resp.data.issuesCount,
      lastCommentUserId: resp.data.lastCommentUserId,
      issueStatus: resp.data.issueStatus,
      hasUnreadIssues: resp.data.hasUnreadIssues,
    })
  })
}

export const postComment =
  (issueId: any, countryIso: any, section: any, target: any, userId: any, msg: any) => (dispatch: any) => {
    const api = issueId
      ? ApiEndPoint.Review.create(issueId)
      : `${ApiEndPoint.Review.createIssueWithComments(countryIso, section)}?target=${target}`
    axios
      .post(api, { msg })
      .then(() => {
        dispatch({ target, type: issuePostCommentCompleted, status: 'completed' })
        dispatch(getIssueSummary(countryIso, section, target))
        dispatch(CountryActions.fetchCountryStatus(countryIso))
        axios
          .get(`${ApiEndPoint.Review.getComments(countryIso, section)}?target=${target}`)
          .then(sectionCommentsReceived(section, target, dispatch))
          .catch((err) => dispatch(applicationError(err)))
      })
      .catch((err) => dispatch(applicationError(err)))
  }

export const retrieveComments = (countryIso: any, section: any, target: any) => (dispatch: any) => {
  dispatch({ section, type: issueRetrieveCommentsStarted, status: 'started' })
  axios
    .get(`${ApiEndPoint.Review.getComments(countryIso, section)}?target=${target}`)
    .then(sectionCommentsReceived(section, target, dispatch))
}

export const openCommentThread = (countryIso: any, section: any, target: any, title: any) => (dispatch: any) => {
  dispatch(retrieveComments(countryIso, section, target))
  dispatch({ type: issueOpenCommentThread, target, section, title })
}
export const closeCommentThread = (countryIso: any, section: any, target: any) => (dispatch: any) => {
  dispatch(getIssueSummary(countryIso, section, target))
  dispatch(CountryActions.fetchCountryStatus(countryIso))
  dispatch({ type: issueCloseCommentThread })
}

export const markCommentAsDeleted = (countryIso: any, section: any, target: any, commentId: any) => (dispatch: any) =>
  axios
    .delete(`/api/review/${countryIso}/comments/${commentId}`)
    .then(() => {
      dispatch(retrieveComments(countryIso, section, target))
      dispatch(getIssueSummary(countryIso, section, target))
      dispatch(CountryActions.fetchCountryStatus(countryIso))
    })
    .catch((err) => dispatch(applicationError(err)))

export const markIssueAsResolved = (countryIso: any, section: any, target: any, issueId: any) => (dispatch: any) => {
  axios
    .post(`${ApiEndPoint.Review.markResolved()}?issueId=${issueId}`)
    .then(() => {
      dispatch(retrieveComments(countryIso, section, target))
      dispatch(getIssueSummary(countryIso, section, target))
      dispatch(CountryActions.fetchCountryStatus(countryIso))
    })
    .catch((err) => dispatch(applicationError(err)))
}
