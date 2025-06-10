import { ActionReducerMapBuilder, createSlice, Reducer } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { DataState, TableDataStatus } from 'client/store/data/state'
import { getTableData } from 'client/store/data/tableData/nodeValues/actions/getTableData'

const initialState: DataState = {
  tableDataStatus: {},
}

export const DataDeprecatedSlice = createSlice({
  name: 'dataDep',
  initialState,
  reducers: {},

  extraReducers: (builder: ActionReducerMapBuilder<DataState>) => {
    // Table data status
    builder.addCase(getTableData.pending, (state, { meta }) => {
      const { assessmentName, countryIso, cycleName, tableNames } = meta.arg
      tableNames.forEach((tableName) => {
        const path = ['tableDataStatus', assessmentName, cycleName, countryIso, tableName]
        Objects.setInPath({ obj: state, path, value: TableDataStatus.fetching })
      })
    })

    builder.addCase(getTableData.fulfilled, (state, { meta }) => {
      // update table data status
      const { assessmentName, countryIso, cycleName, tableNames } = meta.arg
      tableNames.forEach((tableName) => {
        const path = ['tableDataStatus', assessmentName, cycleName, countryIso, tableName]
        Objects.setInPath({ obj: state, path, value: TableDataStatus.fetched })
      })
    })
  },
})

export default DataDeprecatedSlice.reducer as Reducer<DataState>
