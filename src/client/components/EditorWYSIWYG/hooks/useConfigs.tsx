import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import type { IJodit } from 'jodit/esm/types/jodit'

import { useToaster } from 'client/hooks/useToaster'
import { _processPaste } from 'client/components/EditorWYSIWYG/hooks/_processPaste'
import { useRepositoryLinkContext } from 'client/components/EditorWYSIWYG/repositoryLinkContext'
import { EditorConfig } from 'client/components/EditorWYSIWYG/types'

type Props = {
  onlyLinks?: boolean
  options?: EditorConfig
  repository?: boolean
}

type Returned = {
  configs: {
    config: EditorConfig
    configReadOnly: EditorConfig
  }
}

const Buttons = [
  'bold',
  'italic',
  'underline',
  'strikethrough',
  '|',
  'ul',
  'ol',
  '|',
  // 'indent',
  // 'outdent',
  // 'left',
  // 'right',
  // 'justify',
  // 'center',
  // '|',
  'table',
  'link',
  '|',
  'superscript',
  'subscript',
  '|',
  'undo',
  'redo',
  '|',
  'spellcheck',
]

const ButtonsOnlyLinks = ['link']

export const useConfigs = (props: Props): Returned => {
  const { onlyLinks, options, repository } = props
  const { toaster } = useToaster()
  const { t } = useTranslation()
  // const [jodit, setJodit] = useState<IJodit>()
  const { repositoryButton, setJodit } = useRepositoryLinkContext()

  const configs = useMemo<Returned['configs']>(() => {
    const buttons = [...(onlyLinks ? ButtonsOnlyLinks : Buttons)]
    if (repository) {
      const index = buttons.findIndex((b) => b === 'link')
      // @ts-ignore
      buttons.splice(index + 1, 0, repositoryButton)
    }

    const config: EditorConfig = {
      addNewLine: false,
      buttons,
      enter: 'div',
      events: {
        afterInit: (args: IJodit) => {
          setJodit(args)
        },
        applyLink: (_: IJodit, link: HTMLAnchorElement) => {
          link.setAttribute('rel', 'nofollow')
          link.setAttribute('target', '_blank')
        },
      },
      inline: true,
      link: {
        noFollowCheckbox: false,
        openInNewTabCheckbox: false,
      },
      placeholder: '',
      readonly: false,
      statusbar: false,
      toolbarAdaptive: false,
      toolbarButtonSize: 'small',
      uploader: undefined,
      ...options,
    }

    if (onlyLinks) {
      config.askBeforePasteHTML = false
      config.askBeforePasteFromWord = false
      config.defaultActionOnPaste = 'insert_clear_html'
      config.events.processPaste = _processPaste(toaster, t)
    }

    const configReadOnly: EditorConfig = {
      inline: true,
      link: {
        preventReadOnlyNavigation: false,
      },
      readonly: true,
      statusbar: false,
    }

    return { config, configReadOnly }
  }, [onlyLinks, options, repository, repositoryButton, setJodit, t, toaster])

  return { configs }
}
