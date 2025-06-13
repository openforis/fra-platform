import { RootState } from 'client/store/types'

const getState = (state: RootState) => state.ui.notification

export const NotificationSelectors = {
  getState,
}
