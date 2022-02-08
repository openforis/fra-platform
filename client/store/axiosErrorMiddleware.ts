import axios, { AxiosStatic } from 'axios'
import { Action, Dispatch, Middleware, MiddlewareAPI } from 'redux'
import { Identifiers } from '@client/utils'

import { NotificationActions } from '@client/store/ui/notification/slice'

const createAxiosMiddleware =
  (axios: AxiosStatic): Middleware =>
  ({ dispatch }: MiddlewareAPI) => {
    axios.interceptors.response.use(null, (error: any) => {
      dispatch(
        NotificationActions.addMessage({
          id: Identifiers.generateUuid(),
          type: 'error',
          message: error.response.data.error,
          duration: 5000,
        })
      )
      return Promise.reject(error)
    })

    return (next: Dispatch) => (action: Action) => next(action)
  }

export default createAxiosMiddleware(axios)
