import { AppSelectors } from '@webapp/store/app/app.slice'
import { RootState } from '@webapp/store/RootState'
import { useAppSelector } from '@webapp/store/store'

export default () =>
  useAppSelector((state: RootState) => [
    AppSelectors.selectPrintView(state),
    AppSelectors.selectPrintViewOnlyTablesView(state),
  ])
