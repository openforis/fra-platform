import { createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'
import { ApiEndPoint } from '@common/api/endpoint'

export const logout = createAsyncThunk('user/post/logout', async () => axios.post(ApiEndPoint.Auth.logout()))
