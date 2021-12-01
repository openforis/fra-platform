import axios, { AxiosStatic } from 'axios'

import { applicationError } from '@webapp/../../client/components/error/actions'
import { Action, Dispatch, Middleware, MiddlewareAPI } from 'redux'

const createAxiosMiddleware =
  (axios: AxiosStatic): Middleware =>
  ({ dispatch }: MiddlewareAPI) => {
    axios.interceptors.response.use(null, (error: any) => {
      dispatch(applicationError(error))

      return Promise.reject(error)
    })

    return (next: Dispatch) => (action: Action) => next(action)
  }

export default createAxiosMiddleware(axios)
