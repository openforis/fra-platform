import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleDataParams } from 'meta/api/request'
import { RepositoryItem } from 'meta/cycleData'

import { ThunkApiConfig } from 'client/store/types'

type Props = CycleDataParams & {
  repositoryItem: Partial<RepositoryItem>
}

export const removeRepositoryItem = createAsyncThunk<Partial<RepositoryItem>, Props, ThunkApiConfig>(
  'repositoryItem/remove',
  async (props) => {
    const { repositoryItem } = props
    const { uuid } = repositoryItem
    await axios.delete(ApiEndPoint.CycleData.Repository.one(), { params: { uuid, ...props } })
    return repositoryItem
  }
)
