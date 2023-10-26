import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { UUIDs } from 'utils/uuids'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleDataParams } from 'meta/api/request'
import {
  CommentableDescriptionName,
  CommentableDescriptionValue,
  DataSource,
  DescriptionCountryValues,
} from 'meta/assessment'

import { updateDescription } from './updateDescription'

type Props = CycleDataParams & {
  sectionName: string
  previousSectionName: string
  currentValue: CommentableDescriptionValue
}

export const copyPreviousDatasources = createAsyncThunk<void, Props>(
  'section/copy/description/dataSources',
  async (props, { dispatch }) => {
    const { assessmentName, cycleName, countryIso, sectionName, previousSectionName, currentValue } = props
    if (!previousSectionName) return

    const name = CommentableDescriptionName.dataSources
    const params = { countryIso, assessmentName, cycleName, sectionName: previousSectionName, name }
    const { data } = await axios.get<DescriptionCountryValues>(ApiEndPoint.CycleData.descriptions(), { params })

    const dataSources = data?.[countryIso]?.[previousSectionName]?.[name]?.dataSources
    const value = {
      ...currentValue,
      dataSources: dataSources?.map(({ variables: _variables, ...rest }: DataSource) => {
        return { ...rest, variables: [] as Array<string>, uuid: UUIDs.v4() }
      }),
    }

    dispatch(updateDescription({ assessmentName, cycleName, countryIso, sectionName, name, value }))
  }
)
