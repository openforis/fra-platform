import { createAsyncThunk } from '@reduxjs/toolkit'
import { Functions } from '@utils/functions'
import axios from 'axios'

import { ApiEndPoint } from '@meta/api/endpoint'
import { CycleDataParams, NodesBody } from '@meta/api/request'

type Props = CycleDataParams & NodesBody

const patchNodeValues = Functions.debounce(async ({ tableName, values, ...params }: Props) => {
  try {
    await axios.patch(ApiEndPoint.CycleData.Table.nodes(), { tableName, values }, { params })
  } catch (e) {
    // placeholder to avoid app crash
  }
}, 250)

export const updateNodeValues = createAsyncThunk<void, Props>('section/nodeValues/update', (props) => {
  patchNodeValues(props)
})
