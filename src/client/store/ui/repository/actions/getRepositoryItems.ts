import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleParams } from 'meta/api/request'
import { RepositoryItem } from 'meta/cycleData'

import { ThunkApiConfig } from 'client/store/types'

type Props = CycleParams

export const getRepositoryItems = createAsyncThunk<Array<RepositoryItem>, Props, ThunkApiConfig>(
  'repositoryItems/get',
  async (props) => {
    const { assessmentName, cycleName, countryIso } = props
    const params = { countryIso, assessmentName, cycleName }
    const config = { params }
    const { data } = await axios.get(ApiEndPoint.CycleData.Repository.many(), config)
    return data
  }
)
