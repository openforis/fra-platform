import { AppDispatch } from '@webapp/store/store'
import { AppState } from '@webapp/store/app/types'

export type RootState = {
  dispatch: AppDispatch
  app: AppState
}
