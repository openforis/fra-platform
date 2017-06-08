import axios from 'axios'

export const issuePostCommentCompleted = 'issue/comment/post/completed'
export const issueRetrieveCommentsStarted = 'issue/comment/retrieve/started'
export const issueRetrieveCommentsCompleted = 'issue/comment/retrieve/completed'
export const issueOpenCommentThread = 'issue/comment/thread/open'
export const issueCloseCommentThread = 'issue/comment/thread/close'

export const postComment = (countryIso, section, target, userId, issueId, msg) => dispatch => {
  axios.post(`api/country/issue/${countryIso}/${section}?target=${target}`, {msg}).then(() => {
      dispatch({target: target, type: issuePostCommentCompleted, status: 'completed'})
      axios.get(`api/country/issue/${countryIso}/${target}`).then(resp =>
        dispatch({target: target, type: issueRetrieveCommentsCompleted, comments: resp.data})
      )
    }
  )
}

export const retrieveComments = (countryIso, section) => dispatch => {
  dispatch({section: section, type: issueRetrieveCommentsStarted, status: 'started'})
  axios.get(`api/country/issue/${countryIso}/${section}`).then(resp =>
    dispatch({section: section, type: issueRetrieveCommentsCompleted, comments: resp.data})
  )
}

export const openCommentThread = target => ({type: issueOpenCommentThread, target})
export const closeCommentThread = target => ({type: issueCloseCommentThread, target})
