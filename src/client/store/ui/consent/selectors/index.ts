import { RootState } from 'client/store/types'

const isOpen = (state: RootState): boolean => state.ui.consent.isOpen

export const ConsentSelectors = {
  isOpen,
}
