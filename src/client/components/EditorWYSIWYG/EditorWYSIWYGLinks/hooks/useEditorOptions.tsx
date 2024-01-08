import React, { useMemo } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { useTranslation } from 'react-i18next'

import type { IControlType } from 'jodit/src/types/toolbar'
import type { Jodit } from 'jodit/types/jodit'

import Icon from 'client/components/Icon'

type Props = {
  setIsOpen: (isOpen: boolean) => void
  setEditor: (editor: Jodit) => void
}

type Returned = Partial<Jodit['options']>

export const useEditorOptions = (props: Props): Returned => {
  const { setIsOpen, setEditor } = props
  const { t } = useTranslation()

  const repositoryButton = useMemo<IControlType>(() => {
    const exec = (editor: Jodit) => {
      setEditor(editor)
      setIsOpen(true)
    }
    const tooltip = t('landing.links.repository')
    const icon = renderToStaticMarkup(<Icon name="icon-files" className="icon-reference-files" />)

    return { icon, exec, tooltip }
  }, [setEditor, setIsOpen, t])

  return useMemo<Returned>(() => {
    const buttons = ['link', '|', repositoryButton]
    const statusbar = false

    return { buttons, inline: true, statusbar }
  }, [repositoryButton])
}
