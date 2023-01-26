import React, { useMemo, useRef } from 'react'

import type { Jodit } from 'jodit/types/jodit'
import JoditEditor from 'jodit-react'

type Props = {
  value: string
  onChange: (value?: string) => void
}

const removeButtons = ['image', 'video', 'eraser', 'copyformat', 'fullsize', 'print', 'about']

const EditorWYSIWYG: React.FC<Props> = (props: Props) => {
  const { onChange, value } = props
  const editor = useRef(null)

  const config = useMemo<Partial<Jodit['options']>>(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/doc/
      removeButtons,
      uploader: undefined,
    }),
    []
  )

  return (
    <JoditEditor
      ref={editor}
      value={value}
      config={config}
      onBlur={onChange} // preferred to use only this option to update the content for performance reasons
    />
  )
}

export default EditorWYSIWYG
