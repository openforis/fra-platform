import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import type { IControlType } from 'jodit/src/types/toolbar'

type ButtonType = IControlType

type Props = {
  setIsOpen: (isOpen: boolean) => void
}

export const useEditorOptions = (props: Props) => {
  const { setIsOpen } = props
  const { t } = useTranslation()

  const repositoryButton: ButtonType = useMemo(() => {
    const exec = () => setIsOpen(true)
    const name = t('landing.links.repository')
    const tooltip = t('nationalDataPoint.addLinksFromRepository')
    return { name, exec, tooltip }
  }, [setIsOpen, t])

  return useMemo(() => {
    const buttons = ['link', '|', repositoryButton]
    const statusbar = false

    return { buttons, statusbar }
  }, [repositoryButton])
}
