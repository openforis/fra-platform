import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleParams } from 'meta/api/request'

import { ThunkApiConfig } from 'client/store/types'
import { RepositorySelectors } from 'client/store/ui/repository/selectors'
import { TablePaginatedActions } from 'client/store/ui/tablePaginated'

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
    const path = ApiEndPoint.CycleData.Repository.many()
    const limit: number = undefined
    const page: number = undefined
    const getDataProps = { assessmentName, cycleName, countryIso, path, limit, page }
    dispatch(TablePaginatedActions.getData(getDataProps))
  }
)
