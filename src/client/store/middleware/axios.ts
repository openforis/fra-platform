import { UUIDs } from 'utils/uuids'
import axios, { AxiosStatic } from 'axios'
import { Action, Dispatch, Middleware, MiddlewareAPI } from 'redux'

import { NotificationActions } from 'client/store/ui/notification/slice'

const createAxiosMiddleware =
  (axios: AxiosStatic): Middleware =>
  ({ dispatch }: MiddlewareAPI) => {
    axios.interceptors.response.use(null, (error: any) => {
      dispatch(
        NotificationActions.addMessage({
          id: UUIDs.v4(),
          type: 'error',
          message: error.response.data.error,
        })
      )
      return Promise.reject(error)
    })

    return (next: Dispatch) => (action: Action) => next(action)
  }

export default createAxiosMiddleware(axios)
