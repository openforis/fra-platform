import { RootState } from 'client/store/RootState'
import { AppDispatch } from 'client/store/store'

export type ThunkApiConfig = {
  state: RootState
  dispatch: AppDispatch
}
