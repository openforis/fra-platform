import { i18n } from 'i18next'

import { useAppSelector } from '@webapp/store'

export default (): i18n => useAppSelector((state) => state.app.i18n)
