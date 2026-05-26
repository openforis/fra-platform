import React from 'react'
import classNames from 'classnames'
import JoditEditor from 'jodit-react'

import AddFromRepository from 'client/components/EditorWYSIWYG/AddFromRepository'
import { EditorConfig } from 'client/components/EditorWYSIWYG/types'

import { useConfigs } from './hooks/useConfigs'
import { useOnBlur } from './hooks/useOnBlur'
import { useValidationTooltip } from './hooks/useValidationTooltip'

export type EditorWYSIWYGProps = {
  className?: string
  disabled?: boolean
  id?: string
  onChange: (value?: string) => void
  options?: EditorConfig
  onlyLinks?: boolean
  repository?: boolean
  validationErrors?: Array<string>
  value: string
}

const EditorWYSIWYG: React.FC<EditorWYSIWYGProps> = (props: EditorWYSIWYGProps) => {
  const { className, disabled, id, onChange, onlyLinks, options, repository, validationErrors = [], value } = props

  const { configs } = useConfigs({ onlyLinks, options, repository })
  const onBlur = useOnBlur({ onChange, value })
  const { dataTooltipHtml, dataTooltipId, hasValidationErrors } = useValidationTooltip({ validationErrors })

  return (
    <>
      <div
        className={classNames(
          'editorWYSIWYG',
          { disabled, [className]: className },
          { 'validation-error': hasValidationErrors }
        )}
        data-tooltip-html={dataTooltipHtml}
        data-tooltip-id={dataTooltipId}
        id={id}
      >
        {disabled && <JoditEditor config={configs.configReadOnly} value={value} />}
        {!disabled && <JoditEditor config={configs.config} onBlur={onBlur} value={value} />}
      </div>
      <AddFromRepository />
    </>
  )
}

export default EditorWYSIWYG
