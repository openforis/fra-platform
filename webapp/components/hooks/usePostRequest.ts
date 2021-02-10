import axios from 'axios'

import useAsync from './useAsync'

export default (url: any, data = {}, config = {}) => useAsync(axios.post, [url, data, config])
