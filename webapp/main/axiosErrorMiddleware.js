import axios from 'axios'

import { applicationError } from '@webapp/components/error/actions'

const createAxiosMiddleware = axios => ({ dispatch }) => {
  axios.interceptors.response.use(null, error => {
    dispatch(applicationError(error))

    return Promise.reject(error)
  })

  return next => action => next(action)
}

export default createAxiosMiddleware(axios)
