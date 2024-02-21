import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleParams } from 'meta/api/request'
import { File } from 'meta/file'

import { ThunkApiConfig } from 'client/store/types'

type Props = CycleParams & {
  fileUuid: string
  uuid: string
}

export const getFileMetadata = createAsyncThunk<Omit<File, 'buffer'>, Props, ThunkApiConfig>(
  'repositoryItem/get/file-metadata',
  async (props) => {
    const { uuid } = props
    const url = ApiEndPoint.CycleData.Repository.file(uuid)
    const config = { params: { ...props, metadata: true } }
    const { data } = await axios.get(url, config)
    return data
  }
)
