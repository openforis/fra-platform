import axios from 'axios'

import { useAsync } from 'client/hooks/async'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useGetRequest = (url: any, config = {}) => useAsync(axios.get, [url, config])
