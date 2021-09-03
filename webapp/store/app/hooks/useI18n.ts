import { useSelector } from 'react-redux'
import { i18n } from 'i18next'

import { AppSelectors } from '@webapp/store/app/app.slice'

export default (): i18n => useSelector(AppSelectors.selectI18n)
