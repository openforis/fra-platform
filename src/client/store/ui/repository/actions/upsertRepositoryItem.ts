import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleParams } from 'meta/api/request'
import { RepositoryItem } from 'meta/cycleData'

import { ThunkApiConfig } from 'client/store/types'

type Props = CycleParams & {
  repositoryItem: Partial<RepositoryItem>
}

const _getParamsConfig = (props: Props) => {
  const { assessmentName, cycleName, countryIso } = props
  const params = { countryIso, assessmentName, cycleName }
  return { params }
}

export const upsertRepositoryItem = createAsyncThunk<RepositoryItem, Props, ThunkApiConfig>(
  'repositoryItem/upsert',
  async (props) => {
    const { repositoryItem } = props
    const config = _getParamsConfig(props)

    const request = repositoryItem.uuid ? axios.patch : axios.post
    const { data } = await request(ApiEndPoint.CycleData.Repository.one(), { repositoryItem }, config)
    return data
  }
)
