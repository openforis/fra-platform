import i18nInstance from '@common/i18n/i18nInstance'
import { i18n } from 'i18next'
import { useEffect, useState } from 'react'
import { useAppSelector } from '@webapp/store'

export default (): Partial<i18n> => {
  const [instance, setInstance] = useState(i18nInstance.getInstance())
  const { language } = useAppSelector((state) => state.app)

  useEffect(() => {
    setInstance(i18nInstance.getInstance())
  }, [language])

  return instance
}
