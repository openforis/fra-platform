import axios, { AxiosStatic } from 'axios'

import { applicationError } from '@webapp/components/error/actions'
import { Action, Dispatch, MiddlewareAPI } from 'redux'

const createAxiosMiddleware =
  (axios: AxiosStatic) =>
  ({ dispatch }: MiddlewareAPI) => {
    axios.interceptors.response.use(null, (error: any) => {
      dispatch(applicationError(error))

      return Promise.reject(error)
    })

    return (next: Dispatch) => (action: Action) => next(action)
  }

export default createAxiosMiddleware(axios)
