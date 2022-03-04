import axios from 'axios'

import { useAsync } from './useAsync'

export const useGetRequest = (url: any, config = {}) => useAsync(axios.get, [url, config])
