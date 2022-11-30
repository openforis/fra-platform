import { UUIDs } from '@utils/uuids'
import axios, { AxiosRequestConfig, AxiosStatic } from 'axios'
import { Action, Dispatch, Middleware, MiddlewareAPI } from 'redux'

import { NotificationActions } from '@client/store/ui/notification/slice'

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

    axios.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        const token = localStorage.getItem('jwtToken')
        // Add 'Authorization' header with token found in localStorage
        // eslint-disable-next-line no-param-reassign
        if (token) config.headers.Authorization = `Bearer ${token}`
        return config
      },
      (error: any) => {
        return Promise.reject(error)
      }
    )

    return (next: Dispatch) => (action: Action) => next(action)
  }

export default createAxiosMiddleware(axios)
