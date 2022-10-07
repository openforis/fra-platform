import { createAsyncThunk } from '@reduxjs/toolkit'
import { Functions } from '@utils/functions'
import axios from 'axios'

import { ApiEndPoint } from '@meta/api/endpoint'
import { CycleDataParams } from '@meta/api/request'
import { CommentableDescriptionValue } from '@meta/assessment/commentableDescription'

const patchDescription = Functions.debounce(
  async (props: CycleDataParams & { name: string; value: CommentableDescriptionValue }) => {
    const { value, ...params } = props

    try {
      await axios.put(ApiEndPoint.CycleData.descriptions(), { value }, { params })
    } catch (e) {
      // placeholder to avoid app crash
    }
  },
  1000
)

export const updateDescription = createAsyncThunk<
  void,
  CycleDataParams & { name: string; value: CommentableDescriptionValue }
>('section/description/update', (params) => {
  patchDescription(params)
})
