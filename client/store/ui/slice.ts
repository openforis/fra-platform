import { createSlice, Reducer } from '@reduxjs/toolkit'
import { UiState } from './stateType'

const initialState: UiState = {
  navigation: {
    visible: false,
  },
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    updateNavigationVisible: (state, action) => {
      state.navigation.visible = action.payload
    },
    toggleNavigationVisible: (state) => {
      state.navigation.visible = !state.navigation.visible
    },
  },
})

export const UiActions = {
  ...uiSlice.actions,
}

export default uiSlice.reducer as Reducer<UiState>
