import axios from 'axios'
import { applicationError } from '../applicationError/actions'

import { getCountryOverview } from '../landing/actions'

export const userChatLoaded = 'userChat/chat/loaded'
export const userChatClose = 'userChat/chat/close'
export const userChatMessageSent = 'userChat/chat/messageSent'

export const openChat = (countryIso, sessionUser, recipientUser) => dispatch => {

  axios
    .get(`/api/userChat/${countryIso}/messages`, {params: {sessionUserId: sessionUser.id, otherUserId: recipientUser.id}})
    .then(resp => {
        const chat = {
          sessionUser,
          recipientUser,
          messages: resp.data
        }

        dispatch({type: userChatLoaded, chat})
        // when opening chat, unread messages are marked as read, therefore reloading country overview is needed
        getCountryOverview(countryIso)(dispatch)
      }
    )
    .catch(e => applicationError(e))
}

export const closeChat = () => dispatch => {
  dispatch({type: userChatClose})
}

export const sendMessage = (countryIso, fromUserId, toUserId, message) => dispatch => {
  axios
    .post(`/api/userChat/${countryIso}/message`, {message, fromUserId, toUserId})
    .then(res => dispatch({type: userChatMessageSent, message: res.data}))
    .catch(e => applicationError(e))
}
