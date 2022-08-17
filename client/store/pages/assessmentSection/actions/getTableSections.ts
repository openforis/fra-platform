import { ApiEndPoint } from '@common/api/endpoint'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { CountryIso } from '@meta/area'
import { TableSection } from '@meta/assessment'

import { setTableSections } from './setTableSections'

export const getTableSections = createAsyncThunk<
  void,
  { countryIso: CountryIso; assessmentName: string; cycleName: string; sectionNames: Array<string> }
>('section/get/metadata', async ({ countryIso, assessmentName, cycleName, sectionNames }, { dispatch }) => {
  const { data } = <{ data: Array<TableSection> }>await axios.get(ApiEndPoint.Sections.metadata(), {
    params: {
      countryIso,
      assessmentName,
      cycleName,
      sectionNames,
    },
  })

  // TODO: Expect backend to return this in correct format and use dispatch(setTableSections({ data }))
  const tableSections: Record<string, TableSection[]> = {}

  data.forEach((ts: TableSection) => {
    if (!tableSections[ts.sectionName]) tableSections[ts.sectionName] = []
    tableSections[ts.sectionName].push(ts)
  })

  dispatch(setTableSections({ tableSections }))
})
