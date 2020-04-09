import { useSelector } from 'react-redux'
import * as AppState from '@webapp/app/appState'

export default () => useSelector((state) => [AppState.isPrintView(state), AppState.isPrintOnlyTablesView(state)])
