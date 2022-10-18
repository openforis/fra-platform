import { createAsyncThunk } from '@reduxjs/toolkit'
import { Functions } from '@utils/functions'
import axios from 'axios'

import { ApiEndPoint } from '@meta/api/endpoint'
import { CycleDataParams, NodesBody } from '@meta/api/request'

type Props = CycleDataParams & NodesBody

const patchNodeValues = async ({ tableName, values, ...params }: Props) => {
  await axios.patch(ApiEndPoint.CycleData.Table.nodes(), { tableName, values }, { params })
}

const getDebounceId = ({ values }: Props) => values[0].colName

export const updateNodeValues = createAsyncThunk<void, Props>('section/nodeValues/update', (props) =>
  Functions.debounce(patchNodeValues, getDebounceId(props), 1000)(props)
)
