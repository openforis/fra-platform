import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleDataParams } from 'meta/api/request'

type Props = CycleDataParams & { uuid: string }

export const deleteDataSource = createAsyncThunk<void, Props>('section/dataSource/delete', (props) => {
  return axios.delete(ApiEndPoint.CycleData.Descriptions.DataSources.one(), { params: props })
})
