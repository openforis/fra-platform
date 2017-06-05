import axios from 'axios'

export const issuePostCommentCompleted = 'issue/comment/post/completed'
export const issueRetrieveCommentsStarted = 'issue/comment/retrieve/started'
export const issueRetrieveCommentsCompleted = 'issue/comment/retrieve/completed'

export const postComment = (countryIso, target, userId, issueId, msg) => dispatch => {
  axios.post(`api/country/issue/${countryIso}/${target}`, {msg}).then(() => {
      dispatch({target: target, type: issuePostCommentCompleted, status: 'completed'})
      axios.get(`api/country/issue/${countryIso}/${target}`).then(resp =>
        dispatch({target: target, type: issueRetrieveCommentsCompleted, comments: resp.data})
      )
    }
  )
}

export const retrieveComments = (countryIso, target) => dispatch => {
  dispatch({target: target, type: issueRetrieveCommentsStarted, status: 'started'})
  axios.get(`api/country/issue/${countryIso}/${target}`).then(resp =>
    dispatch({target: target, type: issueRetrieveCommentsCompleted, comments: resp.data})
  )
}
