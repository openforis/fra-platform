import axios from 'axios'

export const issuePostCommentCompleted = 'issue/comment/post/completed'
export const issueRetrieveCommentsStarted = 'issue/comment/retrieve/started'
export const issueRetrieveCommentsCompleted = 'issue/comment/retrieve/completed'

export const postComment = (countryIso, userId, issueId, msg) => dispatch => {
  axios.post(`api/country/issue/${countryIso}`, {msg}).then(() => {
      return dispatch({type: issuePostCommentCompleted, status: 'completed'})
    }
  )
}

export const retrieveComments = (countryIso) => dispatch => {
  dispatch({type: issueRetrieveCommentsStarted, status: 'started'})
  axios.get(`api/country/issue/${countryIso}`).then(resp =>
    dispatch({type: issueRetrieveCommentsCompleted, comments: resp.data})
  )
}
