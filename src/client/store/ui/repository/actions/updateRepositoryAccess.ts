import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleParams } from 'meta/api/request'
import { RepositoryItem } from 'meta/cycleData'

type Props = CycleParams & {
  repositoryItem: RepositoryItem
}

export const updateRepositoryItemAccess = createAsyncThunk<RepositoryItem, Props>(
  'repositoryItem/updateAccess',
  async (props) => {
    const { repositoryItem } = props
    const { assessmentName, cycleName, countryIso } = props
    const params = { countryIso, assessmentName, cycleName }
    const config = { params }
    const { data } = await axios.patch(ApiEndPoint.CycleData.Repository.updateAccess(), { repositoryItem }, config)
    return data
  }
)
