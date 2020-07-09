import axios from 'axios'
import { applicationError } from '../../../../components/error/actions'

export const countryMessageBoardOpen = 'countryMessageBoard/open'
export const countryMessageBoardClose = 'countryMessageBoard/close'
export const countryMessageBoardOpenMessageSent = 'countryMessageBoard/message/sent'
export const countryMessageBoardAllMessagesLoad = 'countryMessageBoard/messages/all/load'
export const countryMessageBoardNewMessagesLoad = 'countryMessageBoard/messages/new/load'

export const openCountryMessageBoard = () => dispatch =>
  dispatch({type: countryMessageBoardOpen})

export const closeCountryMessageBoard = () => dispatch => {
  dispatch({type: countryMessageBoardClose})
  clearFetchingNewMessages()
}

export const sendCountryMessageBoard = (countryIso, message, fromUserId, fromUserName) => dispatch => {

  dispatch({
    type: countryMessageBoardOpenMessageSent,
    message: {text: message, fromUserId, fromUserName, time: new Date().toISOString()}
  })

  axios
    .post(`/api/countryMessageBoard/${countryIso}/message`, {message, fromUserId})
    .catch(e => applicationError(e))
}

export const fetchAllCountryMessageBoardMessages = countryIso => dispatch => {
  axios
    .get(`/api/countryMessageBoard/${countryIso}/messages/all`)
    .then(resp => dispatch({type: countryMessageBoardAllMessagesLoad, messages: resp.data}))
    .catch(e => applicationError(e))

  clearFetchingNewMessages()
  dispatch(fetchNewCountryMessageBoardMessages(countryIso))
}

const clearFetchingNewMessages = () => {
  clearTimeout(fetchNewMessagesTimeout)
  fetchNewMessagesTimeout = null
}

let fetchNewMessagesTimeout = null
const fetchNewCountryMessageBoardMessages = countryIso => dispatch => {

  const fetch = () => fetchNewMessagesTimeout = setTimeout(() => {

    axios.get(`/api/countryMessageBoard/${countryIso}/messages/new`)
      .then(resp => {
        dispatch({type: countryMessageBoardNewMessagesLoad, messages: resp.data})
        fetch()
      })
      .catch(e => applicationError(e))
  }, 1000)

  fetch()

}
