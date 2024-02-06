import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleParams } from 'meta/api/request'
import { RepositoryItem } from 'meta/cycleData'

import { ThunkApiConfig } from 'client/store/types'

type Props = CycleParams & {
  file?: File
  repositoryItem: RepositoryItem
}

export const upsertRepositoryItem = createAsyncThunk<RepositoryItem, Props, ThunkApiConfig>(
  'repositoryItem/upsert',
  async (props) => {
    const { file, repositoryItem } = props
    const { assessmentName, cycleName, countryIso } = props
    const formData = new FormData()
    formData.append('name', repositoryItem?.name)
    formData.append('link', repositoryItem?.link)

    if (file) formData.append('file', file)

    const params = { countryIso, assessmentName, cycleName }
    const config = { params }
    const { data } = await axios.post(ApiEndPoint.CycleData.Repository.one(), formData, config)

    return data
  }
)
