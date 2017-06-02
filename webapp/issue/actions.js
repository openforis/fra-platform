import axios from 'axios'

export const issuePostCommentCompleted = 'issue/comment/post/completed'

export const postComment = (countryIso, userId, issueId, msg) => dispatch => {
  axios.post(`api/country/issue/${countryIso}`, {msg}).then(() =>
  dispatch({type: issuePostCommentCompleted})
  )
}
