import { createSlice, Reducer } from '@reduxjs/toolkit'
import { fetchSectionData } from './actions/fetchSectionData'
import { SectionDataState } from './stateType'

const initialState: SectionDataState = {
  tableData: {},
}

export const sectionSlice = createSlice({
  name: 'section',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSectionData.fulfilled, (state, { payload }) => {
      payload.forEach(({ tableName, data }) => {
        if (!state.tableData[tableName]) {
          // @ts-ignore
          state.tableData[tableName] = {}
        }
        state.tableData[tableName] = data
      })
    })
  },
})

export const SectionActions = {
  fetchSectionData,
}

export default sectionSlice.reducer as Reducer<SectionDataState>
