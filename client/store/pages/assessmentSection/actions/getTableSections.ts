import { RootState } from '@client/store'
import { ApiEndPoint } from '@common/api/endpoint'
import { CountryIso } from '@meta/area'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { setTableSections } from './setTableSections'

export const getTableSections = createAsyncThunk<
  void,
  { countryIso: CountryIso; assessmentName: string; cycleName: string; section: string }
>('section/get/metadata', async ({ countryIso, assessmentName, cycleName, section }, { dispatch, getState }) => {
  const state = getState() as RootState
  if (!state.pages.assessmentSection.tableSections[section]) {
    const { data } = await axios.get(
      ApiEndPoint.Assessment.Sections.Metadata.many(countryIso, assessmentName, cycleName, section)
    )
    dispatch(setTableSections({ sectionName: section, tableSections: data }))
  }
})
