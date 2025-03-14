import React from 'react'

import { EditorWYSIWYGProps } from 'client/components/EditorWYSIWYG/EditorWYSIWYG'

type Props = {
  value: EditorWYSIWYGProps['value']
}

const EditorWYSIWYGReadOnly: React.FC<Props> = (props: Props) => {
  const { value } = props

  return (
    <div className="editorWYSIWYG jodit-wysiwyg">
      <div className="jodit-react-container">
        <div className="jodit-container jodit jodit_theme_default jodit_inline jodit-wysiwyg_mode">
          <div className="jodit-workplace">
            <div className="jodit-wysiwyg" dangerouslySetInnerHTML={{ __html: value || '' }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditorWYSIWYGReadOnly
