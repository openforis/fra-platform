import './EditorWYSIWYG.scss'
import React from 'react'

import classNames from 'classnames'
import JoditEditor from 'jodit-react'

import { TooltipId } from 'meta/tooltip'

import { EditorConfig } from 'client/components/EditorWYSIWYG/types'

import { useConfigs } from './hooks/useConfigs'
import { useOnBlur } from './hooks/useOnBlur'
import { useValidationError } from './hooks/useValidationError'

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

  const validationError = useValidationError({ value })

  return (
    <div
      className={classNames('editorWYSIWYG', { disabled }, { 'validation-error': validationError.length > 0 })}
      data-tooltip-content={validationError}
      data-tooltip-id={TooltipId.error}
    >
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
