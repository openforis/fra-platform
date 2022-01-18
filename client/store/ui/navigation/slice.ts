import { createSlice, Reducer } from '@reduxjs/toolkit'
import { NavigationState } from './stateType'

const initialState: NavigationState = {
  visible: false,
}

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    updateNavigationVisible: (state, action) => {
      state.visible = action.payload
    },
    toggleNavigationVisible: (state) => {
      state.visible = !state.visible
    },
  },
})

export const NavigationActions = {
  ...navigationSlice.actions,
}

export default navigationSlice.reducer as Reducer<NavigationState>
