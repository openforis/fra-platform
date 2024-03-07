import React, { Dispatch, SetStateAction, useMemo } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { useTranslation } from 'react-i18next'

import type { ButtonsOption, IControlType } from 'jodit/esm/types'
import { Jodit } from 'jodit-react'

import { EditorConfig } from 'client/components/EditorWYSIWYG/types'
import Icon from 'client/components/Icon'

type Props = {
  repository: boolean
  setEditor: Dispatch<SetStateAction<Jodit>>
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export const useEditorOptions = (props: Props): EditorConfig => {
  const { setIsOpen, setEditor, repository } = props
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

  return useMemo<EditorConfig>(() => {
    const buttons: ButtonsOption = ['link']
    if (repository) buttons.push('|', repositoryButton)

    return { buttons }
  }, [repository, repositoryButton])
}
