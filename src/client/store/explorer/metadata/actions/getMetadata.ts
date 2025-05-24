import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleParams } from 'meta/api/request'
import { ExplorerMetadata } from 'meta/explorer/metadata'

type Params = CycleParams & { sectionNames: Array<string> }

type Returned = Record<string, ExplorerMetadata>

export const getMetadata = createAsyncThunk<Returned, Params>('explorer/metadata/get', async (params) => {
  const { data } = await axios.get<Returned>(ApiEndPoint.Explorer.sectionsMetadata(), {
    params,
  })

  return data
})
