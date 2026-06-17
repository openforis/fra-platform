import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleDataParams } from 'meta/api/request/cycleData/cycleData'

type Props = CycleDataParams & { uuid: string }

export const deleteDataSource = createAsyncThunk<void, Props>('section/dataSource/delete', async (props) => {
  await axios.delete(ApiEndPoint.CycleData.Descriptions.DataSources.one(), { params: props })
})
