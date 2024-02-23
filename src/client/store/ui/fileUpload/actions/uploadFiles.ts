import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleParams } from 'meta/api/request'
import { FileSummary } from 'meta/file'

import { ThunkApiConfig } from 'client/store/types'
import { FileUploadActions } from 'client/store/ui/fileUpload/actions/index'

type Props = CycleParams & {
  files: Array<File>
}

export const uploadFiles = createAsyncThunk<Array<FileSummary>, Props, ThunkApiConfig>(
  'fileUpload/uploadFiles',
  async (props, { dispatch }) => {
    const { assessmentName, cycleName, countryIso, files } = props

    const formData = new FormData()
    files.forEach((file) => formData.append('file', file))

    const headers = { 'Content-Type': 'multipart/form-data' }
    const params = { assessmentName, cycleName, countryIso }
    const onUploadProgress = (progressEvent: ProgressEvent) => {
      const { loaded, total } = progressEvent
      dispatch(FileUploadActions.setProgress({ loaded, total }))
    }
    const config = { headers, params, onUploadProgress }

    const { data } = await axios.post(ApiEndPoint.File.many(), formData, config)

    return data
  }
)
