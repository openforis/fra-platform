import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryParams } from 'meta/api/request/country'
import { ExplorerMetadata } from 'meta/explorer/metadata'

type Params = CountryParams & { sectionNames: Array<string> }

type Returned = Record<string, ExplorerMetadata>

export const getMetadata = createAsyncThunk<Returned, Params>('explorer/metadata/get', async (params) => {
  const { data } = await axios.get<Returned>(ApiEndPoint.Explorer.sectionsMetadata(), {
    params,
  })

  return data
})
