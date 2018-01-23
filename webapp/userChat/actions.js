import axios from 'axios'
import { applicationError } from '../applicationError/actions'

export const userChatLoaded = 'userChat/chat/loaded'
export const userChatClose = 'userChat/chat/close'

export const openChat = (chatId, fromUser, toUser) => dispatch => {
  dispatch({type: userChatLoaded, chat: {id: null, fromUser, toUser}})
}

export const closeChat = () => dispatch => {
  dispatch({type: userChatClose})
}
