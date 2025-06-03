import { createSlice } from '@reduxjs/toolkit'

import { getDashboardReducer } from 'client/store/meta/extraReducers/getDashboardReducer'
import { getMetaCacheReducer } from 'client/store/meta/extraReducers/getMetaCacheReducer'
import { getSectionsReducer } from 'client/store/meta/extraReducers/getSectionsReducer'
import { initAppReducer } from 'client/store/meta/extraReducers/initAppReducer'
import { setTableSectionsReducer } from 'client/store/meta/extraReducers/setTableSectionsReducer'
import { initialState } from 'client/store/meta/state'

export const MetaSlice = createSlice({
  name: 'meta',
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
