import axios from 'axios'

import { applicationError } from '@webapp/components/error/actions'

const createAxiosMiddleware = (axios: any) => ({ dispatch }: any) => {
  axios.interceptors.response.use(null, (error: any) => {
    dispatch(applicationError(error))

    return Promise.reject(error)
  })

  return (next: any) => (action: any) => next(action)
}

export default createAxiosMiddleware(axios)
