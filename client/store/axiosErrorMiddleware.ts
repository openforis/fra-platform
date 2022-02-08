import axios, { AxiosStatic } from 'axios'
import { Action, Dispatch, Middleware, MiddlewareAPI } from 'redux'
import { v4 as uuidv4 } from 'uuid'

import { NotificationActions } from '@client/store/ui/notification/slice'

const createAxiosMiddleware =
  (axios: AxiosStatic): Middleware =>
  ({ dispatch }: MiddlewareAPI) => {
    axios.interceptors.response.use(null, (error: any) => {
      dispatch(
        NotificationActions.addMessage({
          id: uuidv4(),
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
