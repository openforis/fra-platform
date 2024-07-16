import './EditorWYSIWYG.scss'
import React from 'react'

import classNames from 'classnames'
import JoditEditor from 'jodit-react'

import { TooltipId } from 'meta/tooltip'

import AddFromRepository from 'client/components/EditorWYSIWYG/AddFromRepository'
import { EditorConfig } from 'client/components/EditorWYSIWYG/types'

import { useConfigs } from './hooks/useConfigs'
import { useOnBlur } from './hooks/useOnBlur'
import { useValidationError } from './hooks/useValidationError'

export type EditorWYSIWYGProps = {
  disabled?: boolean
  onChange: (value?: string) => void
  options?: EditorConfig
  onlyLinks?: boolean
  repository?: boolean
  value: string
}

const EditorWYSIWYG: React.FC<EditorWYSIWYGProps> = (props: EditorWYSIWYGProps) => {
  const { disabled, onlyLinks, onChange, options, repository, value } = props

  const { configs } = useConfigs({ onlyLinks, options, repository })
  const onBlur = useOnBlur({ onChange, value })
  const validationError = useValidationError({ value })

  return (
    <>
      <div
        className={classNames('editorWYSIWYG', { disabled }, { 'validation-error': validationError.length > 0 })}
        data-tooltip-content={validationError}
        data-tooltip-id={TooltipId.error}
      >
        {disabled && <JoditEditor config={configs.configReadOnly} value={value} />}
        {!disabled && <JoditEditor config={configs.config} onBlur={onBlur} value={value} />}
      </div>
      <AddFromRepository />
    </>
  )
}

EditorWYSIWYG.defaultProps = {
  disabled: false,
  onlyLinks: false,
  options: {},
  repository: false,
}

export default EditorWYSIWYG
