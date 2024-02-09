import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleParams } from 'meta/api/request'
import { File as FileType } from 'meta/file'

import { ThunkApiConfig } from 'client/store/types'

type Props = CycleParams & {
  files: Array<File>
}

export const uploadFiles = createAsyncThunk<Array<FileType>, Props, ThunkApiConfig>(
  'fileUpload/uploadFiles',
  async (props) => {
    const { assessmentName, cycleName, countryIso, files } = props
    const formData = new FormData()
    files.forEach((file) => formData.append('file', file))

    const headers = { 'Content-Type': 'multipart/form-data' }
    const params = { assessmentName, cycleName, countryIso }
    const config = { headers, params }
    const { data } = await axios.post(ApiEndPoint.File.many(), formData, config)

    return data
  }
)
