import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryParams } from 'meta/api/request/country'
import { RepositoryItem } from 'meta/cycleData/repository/item'
import { FileMeta } from 'meta/file/meta'

import { ThunkApiConfig } from 'client/store/types'

type Props = CountryParams & {
  repositoryItem: RepositoryItem
}

export const getFileMeta = createAsyncThunk<FileMeta, Props, ThunkApiConfig>(
  'repositoryItem/file-meta/get',
  async (props) => {
    const { assessmentName, countryIso, cycleName, repositoryItem } = props
    const { fileUuid, uuid } = repositoryItem
    const url = ApiEndPoint.CycleData.Repository.fileMeta()
    const params = { assessmentName, cycleName, countryIso, uuid, fileUuid }
    const config = { params }
    const { data } = await axios.get(url, config)
    return data
  }
)
