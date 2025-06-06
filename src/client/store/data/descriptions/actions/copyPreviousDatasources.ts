import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleDataParams } from 'meta/api/request'
import {
  CommentableDescriptionName,
  CommentableDescriptionValue,
  DescriptionCountryValues,
} from 'meta/assessment/descriptionValue'
import { UUIDs } from 'meta/uuid'

import { updateDescription } from './updateDescription'

type Props = CycleDataParams & {
  sectionName: string
  previousSectionName: string
  currentValue: CommentableDescriptionValue
}

export const copyPreviousDatasources = createAsyncThunk<void, Props>(
  'data/descriptions/dataSources/copy',
  async (props, { dispatch }) => {
    const { assessmentName, countryIso, currentValue, cycleName, previousSectionName, sectionName } = props
    if (!previousSectionName) return

    const name = CommentableDescriptionName.dataSources
    const params = { countryIso, assessmentName, cycleName, sectionName: previousSectionName, name }
    const { data } = await axios.get<DescriptionCountryValues>(ApiEndPoint.CycleData.Descriptions.many(), { params })

    const dataSources = data?.[countryIso]?.[previousSectionName]?.[name]?.dataSources
    const value = {
      ...currentValue,
      dataSources: dataSources?.map(({ variables: _variables, ...rest }) => {
        return { ...rest, variables: [] as Array<string>, uuid: UUIDs.getUuid() }
      }),
    }

    dispatch(updateDescription({ assessmentName, cycleName, countryIso, sectionName, name, value }))
  }
)
