import { createSlice, Reducer } from '@reduxjs/toolkit'
import { fetchSectionData } from './actions/fetchSectionData'
import { fetchSectionTablesMetadata } from './actions/fetchSectionTablesMetadata'
import { SectionDataState } from './stateType'

const initialState: SectionDataState = {
  tables: [],
  tableData: {},
}

export const sectionSlice = createSlice({
  name: 'section',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSectionTablesMetadata.fulfilled, (state, { payload }) => {
      state.tables = payload
    })
    builder.addCase(fetchSectionData.fulfilled, (state, { payload }) => {
      payload.forEach(({ tableName, data }) => {
        if (!state.tableData[tableName]) state.tableData[tableName] = {}
        state.tableData[tableName] = data
      })
    })
  },
})

export const SectionActions = {
  fetchSectionTablesMetadata,
  fetchSectionData,
}

export default sectionSlice.reducer as Reducer<SectionDataState>
