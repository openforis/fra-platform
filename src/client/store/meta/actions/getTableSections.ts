import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryParams } from 'meta/api/request/country'
import { TableSection } from 'meta/assessment/tableSection'

import { setTableSections } from './setTableSections'

export const getTableSections = createAsyncThunk<void, CountryParams & { sectionNames: Array<string> }>(
  'sections/metadata/get',
  async (params, { dispatch }) => {
    const { data: tableSections } = <{ data: Record<string, Array<TableSection>> }>(
      await axios.get(ApiEndPoint.MetaData.sectionsMetadata(), { params })
    )

    dispatch(setTableSections({ tableSections, assessmentName: params.assessmentName, cycleName: params.cycleName }))
  }
)
