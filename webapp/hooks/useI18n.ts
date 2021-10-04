import { i18n } from 'i18next'

import { useTranslation } from 'react-i18next'

export default (): Partial<i18n> => {
  const { i18n } = useTranslation()
  return i18n
}
