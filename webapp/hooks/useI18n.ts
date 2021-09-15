import { useSelector } from 'react-redux'
import { i18n } from 'i18next'

import * as AppState from '@webapp/store/app/state'

export default (): i18n => useSelector(AppState.getI18n) as i18n
