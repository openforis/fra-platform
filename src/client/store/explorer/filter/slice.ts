import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'

import { ExplorerFilterState } from './state'

export const ExplorerFilterSlice = createSlice({
  name: 'filter',
  initialState: {},
  reducers: {
    setCountries: (
      state: ExplorerFilterState,
      action: PayloadAction<{
        assessmentName: AssessmentName
        countries: Array<CountryIso>
        cycleName: CycleName
      }>
    ) => {
      const { assessmentName, countries, cycleName } = action.payload

      Objects.setInPath({
        obj: state,
        path: [assessmentName, cycleName, 'countries'],
        value: countries,
      })
    },
  },
})
