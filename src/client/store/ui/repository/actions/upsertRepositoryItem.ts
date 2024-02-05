import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleParams } from 'meta/api/request'

import { ThunkApiConfig } from 'client/store/types'
import { fetchRepositoryItems } from 'client/store/ui/repository/actions/fetchRepositoryItems'
import { RepositorySelectors } from 'client/store/ui/repository/selectors'

type Props = CycleParams & {
  file?: File
}

export const upsertRepositoryItem = createAsyncThunk<void, Props, ThunkApiConfig>(
  'repositoryItem/upsert',
  async (props, { getState, dispatch }) => {
    const { file } = props
    const repositoryItem = RepositorySelectors.getRepositoryItem(getState())
    const { assessmentName, cycleName, countryIso } = props
    const formData = new FormData()
    formData.append('name', repositoryItem?.name)
    formData.append('link', repositoryItem?.link)

    if (file) formData.append('file', file)

    const params = { countryIso, assessmentName, cycleName }
    const config = { params }
    await axios.post(ApiEndPoint.CycleData.Repository.one(), formData, config)
    fetchRepositoryItems({ ...params, dispatch })
  }
)
