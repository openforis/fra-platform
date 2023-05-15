import { createAsyncThunk } from '@reduxjs/toolkit'
import { Functions } from '@utils/functions'
import axios from 'axios'

import { ApiEndPoint } from '@meta/api/endpoint'
import { CycleDataParams } from '@meta/api/request'
import { CommentableDescriptionValue } from '@meta/assessment'

type Props = CycleDataParams & { name: string; value: CommentableDescriptionValue }

const patchDescription = (id: string) =>
  Functions.debounce(
    async ({ value, ...params }: Props) => {
      try {
        await axios.put(ApiEndPoint.CycleData.descriptions(), { value }, { params })
      } catch (e) {
        // placeholder to avoid app crash
      }
    },
    1000,
    id
  )

const getDebounceId = (props: Props) => `${props.countryIso}-${props.sectionName}-${props.name}`

export const updateDescription = createAsyncThunk<void, Props>('section/description/update', (props) => {
  patchDescription(getDebounceId(props))(props)
})
