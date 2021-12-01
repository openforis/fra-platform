import axios from 'axios'
import { ApiEndPoint } from '@common/api/endpoint'
import { applicationError } from '../../../../../client/components/Error/actions'

export const countryMessageBoardOpen = 'countryMessageBoard/open'
export const countryMessageBoardClose = 'countryMessageBoard/close'
export const countryMessageBoardOpenMessageSent = 'countryMessageBoard/message/sent'
export const countryMessageBoardAllMessagesLoad = 'countryMessageBoard/messages/all/load'
export const countryMessageBoardNewMessagesLoad = 'countryMessageBoard/messages/new/load'

let fetchNewMessagesTimeout: any = null
const fetchNewCountryMessageBoardMessages = (countryIso: any) => (dispatch: any) => {
  const fetch = () => {
    fetchNewMessagesTimeout = setTimeout(() => {
      axios
        .get(ApiEndPoint.CountryMessageBoard.getNew(countryIso))
        .then((resp) => {
          dispatch({ type: countryMessageBoardNewMessagesLoad, messages: resp.data })
          fetch()
        })
        .catch((e) => applicationError(e))
    }, 1000)
  }

  fetch()
}

const clearFetchingNewMessages = () => {
  clearTimeout(fetchNewMessagesTimeout)
  fetchNewMessagesTimeout = null
}

export const openCountryMessageBoard = () => (dispatch: any) => dispatch({ type: countryMessageBoardOpen })

export const closeCountryMessageBoard = () => (dispatch: any) => {
  dispatch({ type: countryMessageBoardClose })
  clearFetchingNewMessages()
}

export const sendCountryMessageBoard =
  (countryIso: any, message: any, fromUserId: any, fromUserName: any) => (dispatch: any) => {
    dispatch({
      type: countryMessageBoardOpenMessageSent,
      message: { text: message, fromUserId, fromUserName, time: new Date().toISOString() },
    })

    axios
      .post(ApiEndPoint.CountryMessageBoard.create(countryIso), { message, fromUserId })
      .catch((e) => applicationError(e))
  }

export const fetchAllCountryMessageBoardMessages = (countryIso: any) => (dispatch: any) => {
  axios
    .get(ApiEndPoint.CountryMessageBoard.getAll(countryIso))
    .then((resp) => dispatch({ type: countryMessageBoardAllMessagesLoad, messages: resp.data }))
    .catch((e) => applicationError(e))

  clearFetchingNewMessages()
  dispatch(fetchNewCountryMessageBoardMessages(countryIso))
}
