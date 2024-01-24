import './EditorWYSIWYG.scss'
import React, { useCallback, useMemo, useRef } from 'react'

import classNames from 'classnames'
import type { Jodit } from 'jodit/types/jodit'
import JoditEditor from 'jodit-react'
import rehypeParse from 'rehype-parse'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import { unified } from 'unified'

type Props = {
  disabled?: boolean
  onChange: (value?: string) => void
  options?: Partial<Jodit['options']>
  value: string
}

const buttons = [
  'bold',
  'strikethrough',
  'italic',
  '|',
  'ul',
  'ol',
  '|',
  'table',
  'link',
  '|',
  'undo',
  'redo',
  '|',
  'fullsize',
]

const processor = unified().use(rehypeRaw).use(rehypeSanitize).use(rehypeParse, { fragment: true }).use(rehypeStringify)

const EditorWYSIWYG: React.FC<Props> = (props: Props) => {
  const { disabled, onChange, options, value } = props
  const editor = useRef(null)

  // all options from https://xdsoft.net/jodit/docs/
  const config = useMemo<Partial<Jodit['options']>>(
    () => ({
      addNewLine: false,
      buttons,
      enter: 'div',
      placeholder: '',
      readonly: disabled,
      spellcheck: true,
      statusbar: false,
      toolbar: !disabled,
      toolbarAdaptive: false,
      toolbarButtonSize: 'small',
      uploader: undefined,
      ...options,
    }),
    [options, disabled]
  )

  // Sanitize user input on save
  const onBlur = useCallback(
    async (newValue: string) => {
      const v = await processor.process(newValue)
      onChange(v.toString())
    },
    [onChange]
  )

  return (
    <div className={classNames('editorWYSIWYG')}>
      <JoditEditor
        ref={editor}
        value={value}
        config={config}
        onBlur={onBlur} // preferred to use only this option to update the content for performance reasons
      />
    </div>
  )
}

EditorWYSIWYG.defaultProps = {
  disabled: false,
  options: {},
}

export default EditorWYSIWYG
