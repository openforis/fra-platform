import axios from 'axios'

export const issuePostCommentCompleted = 'issue/comment/post/completed'
export const issueRetrieveCommentsStarted = 'issue/comment/retrieve/started'
export const issueRetrieveCommentsCompleted = 'issue/comment/retrieve/completed'
export const issueOpenCommentThread = 'issue/comment/thread/open'
export const issueCloseCommentThread = 'issue/comment/thread/close'

export const reviewGetCommentCountCompleted = 'review/comment/count/completed'

const readingCompletion = (section, target, dispatch) => resp => {
  const targetkey = typeof target === 'string' ? target : target.join('_')
  dispatch({
    type: issueRetrieveCommentsCompleted,
    section: section,
    target: targetkey,
    issue: resp.data
  })
}

export const postComment = (issueId, countryIso, section, target, userId, msg) => dispatch => {
  const api = issueId ? `api/country/comment/${issueId}` : `api/country/issue/${countryIso}/${section}?target=${target}`
  axios.post(api, {msg}).then(() => {
      dispatch({target: target, type: issuePostCommentCompleted, status: 'completed'})
      getCommentCount(countryIso, section, target)(dispatch)
      axios.get(`api/country/issue/${countryIso}/${section}?target=${target}`)
        .then(readingCompletion(section, target, dispatch))
    }
  )
}

export const retrieveComments = (countryIso, section, target) => dispatch => {
  dispatch({section: section, type: issueRetrieveCommentsStarted, status: 'started'})
  axios.get(`api/country/issue/${countryIso}/${section}?target=${target}`)
    .then(readingCompletion(section, target, dispatch))
}

export const getCommentCount = (countryIso, section, target) => dispatch => {
  axios.get(`api/review/${countryIso}/comments/count/${section}?target=${target}`)
    .then(resp => {
      dispatch({type: reviewGetCommentCountCompleted, section, target, count: resp.data.count})
    })
}

export const openCommentThread = (countryIso, section, target, name) => dispatch => {
  retrieveComments(countryIso, section, target)(dispatch)
  dispatch({type: issueOpenCommentThread, target, name})
}
export const closeCommentThread = target => ({type: issueCloseCommentThread, target})
