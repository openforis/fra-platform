import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleDataParams } from 'meta/api/request'

import { ThunkApiConfig } from 'client/store/types'
import { RepositorySelectors } from 'client/store/ui/repository/selectors'

type Props = CycleDataParams

export const removeRepositoryItem = createAsyncThunk<void, Props, ThunkApiConfig>(
  'repositoryItem/remove',
  async (props, { getState }) => {
    const { uuid } = RepositorySelectors.getRepositoryItem(getState())
    await axios.delete(ApiEndPoint.CycleData.Repository.one(), { params: { uuid, ...props } })
  }
)
