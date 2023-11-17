import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import type { IControlType } from 'jodit/src/types/toolbar'
import type { Jodit } from 'jodit/types/jodit'

type ButtonType = IControlType

type Props = {
  setIsOpen: (isOpen: boolean) => void
  setEditor: (editor: Jodit) => void
}

export const useEditorOptions = (props: Props) => {
  const { setIsOpen, setEditor } = props
  const { t } = useTranslation()

  const repositoryButton: ButtonType = useMemo(() => {
    const exec = (editor: Jodit) => {
      setEditor(editor)
      setIsOpen(true)
    }
    const label = t('landing.links.repository')
    const name = label
    const tooltip = label
    return { name, exec, tooltip }
  }, [setEditor, setIsOpen, t])

  return useMemo(() => {
    const buttons = ['link', '|', repositoryButton]
    const statusbar = false

    return { buttons, statusbar }
  }, [repositoryButton])
}
