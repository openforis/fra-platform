import { ApiEndPoint } from '@meta/api/endpoint'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { CycleParams } from '@meta/api/request'
import { TableSection } from '@meta/assessment'

import { setTableSections } from './setTableSections'

export const getTableSections = createAsyncThunk<void, CycleParams & { sectionNames: Array<string> }>(
  'sections/metadata/get',
  async (params, { dispatch }) => {
    const { data: tableSections } = <{ data: Record<string, Array<TableSection>> }>(
      await axios.get(ApiEndPoint.MetaData.sectionsMetadata(), { params })
    )

    dispatch(setTableSections({ tableSections }))
  }
)
