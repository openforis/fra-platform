import React, { useCallback, useMemo, useRef } from 'react'

import type { Jodit } from 'jodit/types/jodit'
import JoditEditor from 'jodit-react'
import rehypeParse from 'rehype-parse'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import { unified } from 'unified'

type Props = {
  value: string
  onChange: (value?: string) => void
}

const removeButtons = ['image', 'video', 'eraser', 'copyformat', 'fullsize', 'print', 'about']

const processor = unified().use(rehypeRaw).use(rehypeSanitize).use(rehypeParse, { fragment: true }).use(rehypeStringify)

const EditorWYSIWYG: React.FC<Props> = (props: Props) => {
  const { onChange, value } = props
  const editor = useRef(null)

  const config = useMemo<Partial<Jodit['options']>>(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/docs/
      removeButtons,
      uploader: undefined,
    }),
    []
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
    <JoditEditor
      ref={editor}
      value={value}
      config={config}
      onBlur={onBlur} // preferred to use only this option to update the content for performance reasons
    />
  )
}

export default EditorWYSIWYG
