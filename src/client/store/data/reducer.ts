import { combineReducers, combineSlices } from '@reduxjs/toolkit'

import { ContactsSlice } from 'client/store/data/contacts/slice'
import { DescriptionsSlice } from 'client/store/data/descriptions/slice'
import { HistorySlice } from 'client/store/data/history/slice'
import { LinkedDataSourcesSlice } from 'client/store/data/linkedDataSources/slice'
import { OriginalDataPointSliceName } from 'client/store/data/originalDataPoint/slice/name'
import { OriginalDataPointState } from 'client/store/data/originalDataPoint/state'
import { EstimationsSlice } from 'client/store/data/tableData/estimations/slice'
import { NodeValuesSlice } from 'client/store/data/tableData/nodeValues/slice'
import { DescriptionValidationSlice } from 'client/store/data/validations/descriptions/slice'
import { NationalDataPointValidationSlice } from 'client/store/data/validations/nationalDataPoints/slice'
import { SummaryValidationSlice } from 'client/store/data/validations/summary/slice'
import { TableValidationSlice } from 'client/store/data/validations/tables/slice'

type DataLazyLoadedSlices = {
  [OriginalDataPointSliceName]: OriginalDataPointState
}

const staticReducers = {
  [ContactsSlice.name]: ContactsSlice.reducer,
  [DescriptionsSlice.name]: DescriptionsSlice.reducer,
  [HistorySlice.name]: HistorySlice.reducer,
  [LinkedDataSourcesSlice.name]: LinkedDataSourcesSlice.reducer,
  tableData: combineReducers({
    [EstimationsSlice.name]: EstimationsSlice.reducer,
    [NodeValuesSlice.name]: NodeValuesSlice.reducer,
  }),
  validations: combineReducers({
    [DescriptionValidationSlice.name]: DescriptionValidationSlice.reducer,
    [NationalDataPointValidationSlice.name]: NationalDataPointValidationSlice.reducer,
    [SummaryValidationSlice.name]: SummaryValidationSlice.reducer,
    [TableValidationSlice.name]: TableValidationSlice.reducer,
  }),
}

export const dataReducer = combineSlices(staticReducers).withLazyLoadedSlices<DataLazyLoadedSlices>()

export const injectDataSlice = (slice: Parameters<typeof dataReducer.inject>[0]): void => {
  dataReducer.inject(slice)
}
