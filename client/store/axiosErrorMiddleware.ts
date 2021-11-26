import axios, { AxiosStatic } from 'axios'

import { Action, Dispatch, Middleware /* MiddlewareAPI */ } from 'redux'

const createAxiosMiddleware =
  (axios: AxiosStatic): Middleware =>
  (/* { /!*dispatch*!/ }: MiddlewareAPI */) => {
    axios.interceptors.response.use(null, (error: any) => {
      // TODO: Handle dispatch, application error
      // dispatch(applicationError(error))

      return Promise.reject(error)
    })

    return (next: Dispatch) => (action: Action) => next(action)
  }

export default createAxiosMiddleware(axios)
