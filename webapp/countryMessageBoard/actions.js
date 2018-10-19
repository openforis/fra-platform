import axios from 'axios'
import { applicationError } from '../applicationError/actions'

import { getCountryOverview } from '../landing/actions'

export const countryMessageBoardOpen = 'countryMessageBoard/open'
export const countryMessageBoardClose = 'countryMessageBoard/close'
export const userChatMessageSent = 'userChat/chat/messageSent'

export const openCountryMessageBoard = () => dispatch =>
  dispatch({type: countryMessageBoardOpen})

export const closeCountryMessageBoard = () => dispatch =>
  dispatch({type: countryMessageBoardClose})


// export const sendMessage = (countryIso, fromUserId, toUserId, message) => dispatch => {
//   axios
//     .post(`/api/userChat/${countryIso}/message`, {message, fromUserId, toUserId})
//     .then(res => dispatch({type: userChatMessageSent, message: res.data}))
//     .catch(e => applicationError(e))
// }
