import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosRequestConfig } from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryParams } from 'meta/api/request/country'
import { FileSummary } from 'meta/file/file'

import { FileUploadActions } from 'client/store/fileUpload/actions'
import { ThunkApiConfig } from 'client/store/types'

type Props = CountryParams & {
  files: Array<File>
}

export const uploadFiles = createAsyncThunk<Array<FileSummary>, Props, ThunkApiConfig>(
  'fileUpload/uploadFiles',
  async (props, { dispatch }) => {
    const { assessmentName, countryIso, cycleName, files } = props

    const formData = new FormData()
    files.forEach((file) => formData.append('file', file))

    const headers = { 'Content-Type': 'multipart/form-data' }
    const params = { assessmentName, cycleName, countryIso }
    const onUploadProgress: AxiosRequestConfig['onUploadProgress'] = (progressEvent): void => {
      const { loaded, total } = progressEvent
      dispatch(FileUploadActions.setProgress({ loaded, total }))
    }
    const config: AxiosRequestConfig = { headers, params, onUploadProgress }

    const { data } = await axios.post(ApiEndPoint.File.many(), formData, config)

    return data
  }
)
