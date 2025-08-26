import { createSlice } from '@reduxjs/toolkit'

import { getDashboardReducer } from 'client/store/meta/slice/extraReducers/getDashboardReducer'
import { getMetaCacheReducer } from 'client/store/meta/slice/extraReducers/getMetaCacheReducer'
import { getSectionsReducer } from 'client/store/meta/slice/extraReducers/getSectionsReducer'
import { initAppReducer } from 'client/store/meta/slice/extraReducers/initAppReducer'
import { setTableSectionsReducer } from 'client/store/meta/slice/extraReducers/setTableSectionsReducer'
import { initialState } from 'client/store/meta/state'

import { MetaSliceName } from './name'

export const MetaSlice = createSlice({
  name: MetaSliceName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    getDashboardReducer(builder)
    getMetaCacheReducer(builder)
    getSectionsReducer(builder)
    initAppReducer(builder)
    setTableSectionsReducer(builder)
  },
})
