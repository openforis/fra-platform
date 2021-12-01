import axios from 'axios'
import { ApiEndPoint } from '@common/api/endpoint'
import { applicationError } from '../../../../client/components/Error/actions'

import { getCountryOverview } from '../../countryLanding/actions'

export const userChatLoaded = 'userChat/chat/loaded'
export const userChatClose = 'userChat/chat/close'
export const userChatMessageSent = 'userChat/chat/messageSent'
export const userChatNewMessagesLoaded = 'userChat/chat/newMessages/loaded'

let fetchNewMessagesTimeout: any = null
const getChatNewMessages = (countryIso: any, sessionUser: any, recipientUser: any) => (dispatch: any) => {
  const fetch = () => {
    fetchNewMessagesTimeout = setTimeout(() => {
      axios
        .get(ApiEndPoint.UserChat.getNew(countryIso), {
          params: {
            sessionUserId: sessionUser.id,
            otherUserId: recipientUser.id,
          },
        })
        .then((resp) => {
          dispatch({ type: userChatNewMessagesLoaded, messages: resp.data })
          fetch()
        })
    }, 1000)
  }

  fetch()
}

const clearFetchingNewMessages = () => {
  clearTimeout(fetchNewMessagesTimeout)
  fetchNewMessagesTimeout = null
}

export const openChat = (countryIso: string, sessionUser: any, recipientUser: any) => (dispatch: any) => {
  clearFetchingNewMessages()

  axios
    .get(ApiEndPoint.UserChat.getAll(countryIso), {
      params: {
        sessionUserId: sessionUser.id,
        otherUserId: recipientUser.id,
      },
    })
    .then((resp) => {
      const chat = {
        sessionUser,
        recipientUser,
        messages: resp.data,
      }

      dispatch({ type: userChatLoaded, chat })

      dispatch(getChatNewMessages(countryIso, sessionUser, recipientUser))

      // when opening chat, unread messages are marked as read, therefore reloading country overview is needed
      dispatch(getCountryOverview(countryIso))
    })
    .catch((e) => applicationError(e))
}

export const closeChat = () => (dispatch: any) => {
  dispatch({ type: userChatClose })
  clearFetchingNewMessages()
}

export const sendMessage = (countryIso: any, fromUserId: any, toUserId: any, message: any) => (dispatch: any) => {
  axios
    .post(ApiEndPoint.UserChat.create(countryIso), { message, fromUserId, toUserId })
    .then((res) => dispatch({ type: userChatMessageSent, message: res.data }))
    .catch((e) => applicationError(e))
}
