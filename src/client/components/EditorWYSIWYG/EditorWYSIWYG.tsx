import './EditorWYSIWYG.scss'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import classNames from 'classnames'
import JoditEditor, { IJoditEditorProps, Jodit } from 'jodit-react'
import rehypeParse from 'rehype-parse'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import { unified } from 'unified'

type JoditConfig = IJoditEditorProps['config']

type Props = {
  disabled?: boolean
  onChange: (value?: string) => void
  options?: Partial<JoditConfig>
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
  const [joditEditor, setEditor] = useState<Jodit>(null)
  const editor = useRef(null)

  // all options from https://xdsoft.net/jodit/docs/
  // Do not change readonly or toolbar
  const config = useMemo<Partial<JoditConfig>>(
    () => ({
      addNewLine: false,
      buttons,
      enter: 'div',
      placeholder: '',
      // We initially set readonly to true here, and then toggle it in useEffect
      readonly: true,
      spellcheck: true,
      statusbar: false,
      toolbarAdaptive: false,
      toolbarButtonSize: 'small',
      uploader: undefined,
      events: {
        afterInit: (instance: Jodit) => {
          setEditor(instance)
        },
      },
      ...options,
    }),
    [options]
  )

  // Sanitize user input on save
  const onBlur = useCallback(
    async (newValue: string) => {
      const v = await processor.process(newValue)
      onChange(v.toString())
    },
    [onChange]
  )

  useEffect(() => {
    if (joditEditor) joditEditor.setReadOnly(disabled)
  }, [disabled, joditEditor])

  return (
    <div className={classNames('editorWYSIWYG', { disabled })}>
      <JoditEditor
        config={config}
        onBlur={onBlur} // preferred to use only this option to update the content for performance reasons
        ref={editor}
        value={value}
      />
    </div>
  )
}

EditorWYSIWYG.defaultProps = {
  disabled: false,
  options: {},
}

export default EditorWYSIWYG
