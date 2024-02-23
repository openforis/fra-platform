import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleParams } from 'meta/api/request'
import { RepositoryItem } from 'meta/cycleData'
import { FileMeta } from 'meta/file'

import { ThunkApiConfig } from 'client/store/types'

type Props = CycleParams & {
  repositoryItem: RepositoryItem
}

export const getFileMeta = createAsyncThunk<FileMeta, Props, ThunkApiConfig>(
  'repositoryItem/get/file-meta',
  async (props) => {
    const { assessmentName, cycleName, countryIso, repositoryItem } = props
    const { uuid, fileUuid } = repositoryItem
    const url = ApiEndPoint.CycleData.Repository.fileMeta()
    const params = { assessmentName, cycleName, countryIso, uuid, fileUuid }
    const config = { params }
    const { data } = await axios.get(url, config)
    return data
  }
)
