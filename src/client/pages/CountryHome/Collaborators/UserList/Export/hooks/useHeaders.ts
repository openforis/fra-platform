import { useTranslation } from 'react-i18next'

type Header = { key: string; label: string }
const HEADERS = ['name', 'role', 'email'] as const

export const useHeaders = (): Array<Header> => {
  const { t } = useTranslation()
  return HEADERS.map((key) => ({ key, label: t(`common.${key}`) }))
}
