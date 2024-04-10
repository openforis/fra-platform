import { useMemo, useState } from 'react'

import { Jodit } from 'jodit-react'

import { EditorConfig } from 'client/components/EditorWYSIWYG/types'

type Props = { options?: EditorConfig }

type Returned = {
  configs: {
    config: EditorConfig
    configReadOnly: EditorConfig
  }
  jodit: Jodit
}

const buttons = [
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

export const useConfigs = (props: Props): Returned => {
  const { options } = props

  const [jodit, setJodit] = useState<Jodit>()

  const configs = useMemo<Returned['configs']>(() => {
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
  }, [options])

  return { configs, jodit }
}
