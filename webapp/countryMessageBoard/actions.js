import axios from 'axios'
import { applicationError } from '../applicationError/actions'

export const countryMessageBoardOpen = 'countryMessageBoard/open'
export const countryMessageBoardClose = 'countryMessageBoard/close'
export const countryMessageBoardOpenMessageSent = 'countryMessageBoard/message/sent'

export const openCountryMessageBoard = () => dispatch =>
  dispatch({type: countryMessageBoardOpen})

export const closeCountryMessageBoard = () => dispatch =>
  dispatch({type: countryMessageBoardClose})

export const sendCountryMessageBoard = (countryIso, message, fromUserId, fromUserName) => dispatch => {

  dispatch({
    type: countryMessageBoardOpenMessageSent,
    message: {text: message, fromUserId, fromUserName}
  })

  axios
    .post(`/api/countryMessageBoard/${countryIso}/message`, {message, fromUserId})
    .catch(e => applicationError(e))
}
