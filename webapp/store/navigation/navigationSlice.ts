import { createSlice } from '@reduxjs/toolkit'
import { NavigationState } from '@webapp/store/navigation/navigationStateType'

const initialState: NavigationState = {
  visible: true,
}

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    toggleNavigationVisibility: (state) => {
      state.visible = !state.visible
    },
  },
})

export const NavigationActions = {
  ...navigationSlice.actions,
}

export default navigationSlice.reducer
