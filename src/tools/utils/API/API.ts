import axios from 'axios'

import { cookie } from './cookie'

export const API = axios.create({ headers: { cookie } })
