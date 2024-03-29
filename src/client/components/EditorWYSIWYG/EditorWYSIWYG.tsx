import './EditorWYSIWYG.scss'
import React from 'react'

import classNames from 'classnames'
import JoditEditor from 'jodit-react'

import { EditorConfig } from 'client/components/EditorWYSIWYG/types'

import { useConfigs } from './hooks/useConfigs'
import { useOnBlur } from './hooks/useOnBlur'

type Props = {
  disabled?: boolean
  onChange: (value?: string) => void
  options?: EditorConfig
  value: string
}

const EditorWYSIWYG: React.FC<Props> = (props: Props) => {
  const { disabled, onChange, options, value } = props

  const { configs, jodit } = useConfigs({ options })

  const onBlur = useOnBlur({ jodit, onChange, value })

  return (
    <div className={classNames('editorWYSIWYG', { disabled })}>
      {disabled && <JoditEditor config={configs.configReadOnly} value={value} />}
      {!disabled && <JoditEditor config={configs.config} onBlur={onBlur} value={value} />}
    </div>
  )
}

EditorWYSIWYG.defaultProps = {
  disabled: false,
  options: {},
}

export default EditorWYSIWYG
