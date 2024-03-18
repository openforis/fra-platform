import axios from 'axios'

import { cookies } from './cookie'

export const API = axios.create({ headers: { cookie: cookies.prod } })
