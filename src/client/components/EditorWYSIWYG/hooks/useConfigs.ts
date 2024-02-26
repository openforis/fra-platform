import { useMemo } from 'react'

import { EditorConfig } from 'client/components/EditorWYSIWYG/types'

type Props = { options?: EditorConfig }

type Returned = {
  config: EditorConfig
  configReadOnly: EditorConfig
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

  return useMemo<Returned>(() => {
    const config: EditorConfig = {
      // @ts-ignore
      addNewLine: false,
      buttons,
      enter: 'div',
      inline: true,
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
}
