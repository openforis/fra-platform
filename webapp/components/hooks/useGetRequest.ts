import axios from 'axios'

import useAsync from './useAsync'

export default (url: any, config = {}) => useAsync(axios.get, [url, config])
