import axios from 'axios'

export const issuePostCommentCompleted = 'issue/comment/post/completed'
export const issueRetrieveCommentsCompleted = 'issue/comment/retrieve/completed'

export const postComment = (countryIso, userId, issueId, msg) => dispatch => {
  axios.post(`api/country/issue/${countryIso}`, {msg}).then(() => {
      dispatch({type: issuePostCommentCompleted})
      return retrieveComments(countryIso)(dispatch)
    }
  )
}

export const retrieveComments = (countryIso) => dispatch => {
  axios.get(`api/country/issue/${countryIso}`).then(resp =>
    dispatch({type: issueRetrieveCommentsCompleted, comments: resp.data})
  )
}
