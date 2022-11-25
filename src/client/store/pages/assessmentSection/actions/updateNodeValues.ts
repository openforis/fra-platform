import { createAsyncThunk } from '@reduxjs/toolkit'
import { Functions } from '@utils/functions'
import axios from 'axios'

import { ApiEndPoint } from '@meta/api/endpoint'
import { CycleDataParams, NodesBody } from '@meta/api/request'

type Props = CycleDataParams & NodesBody

const patchNodeValues = (id: string) =>
  Functions.debounce(
    async ({ tableName, values, ...params }: Props) => {
      try {
        await axios.patch(ApiEndPoint.CycleData.Table.nodes(), { tableName, values }, { params })
      } catch (e) {
        // placeholder to avoid app crash
      }
    },
    1000,
    id
  )

const getDebounceId = (props: Props) =>
  `${props.countryIso}-${props.tableName}-${props.values[0].variableName}-${props.values[0].colName}`

export const updateNodeValues = createAsyncThunk<void, Props>('section/nodeValues/update', (props) => {
  patchNodeValues(getDebounceId(props))(props)
})
