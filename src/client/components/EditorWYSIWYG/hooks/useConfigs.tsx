import { useMemo } from 'react'

import { Jodit } from 'jodit-react'

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

  // const [jodit, setJodit] = useState<Jodit>()
  const { repositoryButton, setJodit } = useRepositoryLinkContext()

  const configs = useMemo<Returned['configs']>(() => {
    const buttons = [...(onlyLinks ? ButtonsOnlyLinks : Buttons)]
    if (repository) {
      const index = buttons.findIndex((b) => b === 'link')
      // @ts-ignore
      buttons.splice(index + 1, 0, repositoryButton)
    }

    const config: EditorConfig = {
      // @ts-ignore
      addNewLine: false,
      buttons,
      enter: 'div',
      events: {
        afterInit: (args: Jodit) => {
          setJodit(args)
        },
        applyLink: (_: Jodit, link: HTMLAnchorElement) => {
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
      // @ts-ignore
      uploader: undefined,
      ...options,
    }

    const configReadOnly: EditorConfig = {
      inline: true,
      readonly: true,
      statusbar: false,
    }

    return { config, configReadOnly }
  }, [onlyLinks, options, repository, repositoryButton, setJodit])

  return { configs }
}
