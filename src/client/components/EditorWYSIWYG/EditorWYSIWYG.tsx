import React, { useMemo, useRef } from 'react'

import JoditEditor from 'jodit-react'

type Props = {
  value: string
  onChange: (value?: string) => void
}

const EditorWYSIWYG: React.FC<Props> = (props: Props) => {
  const { onChange, value } = props
  const editor = useRef(null)

  const config = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/doc/,
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
