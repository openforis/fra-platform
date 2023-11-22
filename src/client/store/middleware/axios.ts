import axios, { AxiosStatic } from 'axios'
import { Action, Dispatch, Middleware, MiddlewareAPI } from 'redux'
import { UUIDs } from 'utils/uuids'

import { Lang } from 'meta/lang'

import { NotificationActions } from 'client/store/ui/notification/slice'

const createAxiosMiddleware =
  (axios: AxiosStatic): Middleware =>
  ({ dispatch, getState }: MiddlewareAPI) => {
    axios.interceptors.request.use((config) => {
      const userLanguage = getState().user?.props?.lang ?? localStorage.getItem('i18n/lang') ?? Lang.en
      // eslint-disable-next-line no-param-reassign
      config.headers.locale = userLanguage
      return config
    })

    axios.interceptors.response.use(null, (error: any) => {
      dispatch(
        NotificationActions.addMessage({
          id: UUIDs.v4(),
          type: 'error',
          message: error.response.data.error,
          params: error.response.data.params,
        })
      )
      return Promise.reject(error)
    })

    return (next: Dispatch) => (action: Action) => next(action)
  }

export default createAxiosMiddleware(axios)
