import axios from 'axios'

export const issueRetrieveCommentsStarted = 'review/comment/retrieve/started'
export const issueRetrieveCommentsCompleted = 'review/comment/retrieve/completed'


export const postComment = (issueId, countryIso, section, target, userId, msg) => dispatch => {
  const api = issueId ? `api/country/comment/${issueId}` : `api/country/issue/${countryIso}/${section}?target=${target}`
  axios.post(api, {msg}).then(() => {
      dispatch({target: target, type: issuePostCommentCompleted, status: 'completed'})
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

