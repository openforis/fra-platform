import { useSelector } from 'react-redux'

import * as AppState from '@webapp/store/app/state'

export default () => useSelector(AppState.getI18n)
