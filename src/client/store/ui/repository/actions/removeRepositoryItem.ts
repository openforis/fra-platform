import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleDataParams } from 'meta/api/request'

import { ThunkApiConfig } from 'client/store/types'
import { RepositorySelectors } from 'client/store/ui/repository/selectors'
import { TablePaginatedActions } from 'client/store/ui/tablePaginated'

type Props = CycleDataParams

export const removeRepositoryItem = createAsyncThunk<void, Props, ThunkApiConfig>(
  'repositoryItem/remove',
  async (props, { getState, dispatch }) => {
    const { assessmentName, cycleName, countryIso } = props
    const { uuid } = RepositorySelectors.getRepositoryItem(getState())
    await axios.delete(ApiEndPoint.CycleData.Repository.one(), { params: { uuid, ...props } })
    const path = ApiEndPoint.CycleData.Repository.many()
    const limit: number = undefined
    const page: number = undefined
    const getDataProps = { assessmentName, cycleName, countryIso, path, limit, page }
    dispatch(TablePaginatedActions.getData(getDataProps))
  }
)
