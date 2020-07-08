import axios from 'axios'
import { applicationError } from '../../components/error/actions'

import { getCountryOverview } from '../../countryLanding/actions'

export const userChatLoaded = 'userChat/chat/loaded'
export const userChatClose = 'userChat/chat/close'
export const userChatMessageSent = 'userChat/chat/messageSent'
export const userChatNewMessagesLoaded = 'userChat/chat/newMessages/loaded'

export const openChat = (countryIso, sessionUser, recipientUser) => dispatch => {
  clearFetchingNewMessages()

  axios
    .get(`/api/userChat/${countryIso}/messages/all`, {
      params: {
        sessionUserId: sessionUser.id,
        otherUserId: recipientUser.id
      }
    })
    .then(resp => {
        const chat = {
          sessionUser,
          recipientUser,
          messages: resp.data
        }

        dispatch({type: userChatLoaded, chat})

        dispatch(getChatNewMessages(countryIso, sessionUser, recipientUser))

        // when opening chat, unread messages are marked as read, therefore reloading country overview is needed
        dispatch(getCountryOverview(countryIso))
      }
    )
    .catch(e => applicationError(e))
}

let fetchNewMessagesTimeout = null
const getChatNewMessages = (countryIso, sessionUser, recipientUser) => dispatch => {
  const fetch = () => fetchNewMessagesTimeout = setTimeout(() => {
    axios.get(`/api/userChat/${countryIso}/messages/new`, {
      params: {
        sessionUserId: sessionUser.id,
        otherUserId: recipientUser.id
      }
    })
      .then(resp => {
        dispatch({type: userChatNewMessagesLoaded, messages: resp.data})
        fetch()
      })
  }, 1000)

  fetch()
}

const clearFetchingNewMessages = () => {
  clearTimeout(fetchNewMessagesTimeout)
  fetchNewMessagesTimeout = null
}

export const closeChat = () => dispatch => {
  dispatch({type: userChatClose})
  clearFetchingNewMessages()
}

export const sendMessage = (countryIso, fromUserId, toUserId, message) => dispatch => {
  axios
    .post(`/api/userChat/${countryIso}/message`, {message, fromUserId, toUserId})
    .then(res => dispatch({type: userChatMessageSent, message: res.data}))
    .catch(e => applicationError(e))
}
