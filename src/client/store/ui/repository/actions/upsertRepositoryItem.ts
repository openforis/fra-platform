import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleParams } from 'meta/api/request'
import { RepositoryItem } from 'meta/cycleData'

import { ThunkApiConfig } from 'client/store/types'

type Props = CycleParams & {
  file?: File
  repositoryItem: RepositoryItem
}

const _getFormData = (props: Props) => {
  const { file, repositoryItem } = props
  const formData = new FormData()
  formData.append('repositoryItem', JSON.stringify(repositoryItem))
  if (file) formData.append('file', file)
  return formData
}

const _getParamsConfig = (props: Props) => {
  const { assessmentName, cycleName, countryIso } = props
  const params = { countryIso, assessmentName, cycleName }
  return { params }
}

export const upsertRepositoryItem = createAsyncThunk<RepositoryItem, Props, ThunkApiConfig>(
  'repositoryItem/upsert',
  async (props) => {
    const formData = _getFormData(props)
    const config = _getParamsConfig(props)

    const request = props.repositoryItem.uuid ? axios.patch : axios.post
    const { data } = await request(ApiEndPoint.CycleData.Repository.one(), formData, config)
    return data
  }
)
