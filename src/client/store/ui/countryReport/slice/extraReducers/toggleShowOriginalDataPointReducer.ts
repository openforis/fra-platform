import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { toggleShowOriginalDataPoint } from 'client/store/ui/countryReport/actions/toggleShowOriginalDataPoint'
import { CountryReportState } from 'client/store/ui/countryReport/state'

export const toggleShowOriginalDataPointReducer = (builder: ActionReducerMapBuilder<CountryReportState>) => {
  builder.addCase(toggleShowOriginalDataPoint, (state) => {
    state.showOriginalDataPoint = !state.showOriginalDataPoint
  })
}
