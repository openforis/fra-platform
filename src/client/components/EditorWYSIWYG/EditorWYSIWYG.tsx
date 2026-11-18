import React, { useRef } from 'react'
import classNames from 'classnames'
import JoditEditor from 'jodit-react'

import { InvalidLink } from 'meta/assessment/validation/validation'
import { UUIDs } from 'meta/uuid/uuids'
import { Objects } from 'utils/objects'

import AddFromRepository from 'client/components/EditorWYSIWYG/AddFromRepository'
import InvalidLinksTooltip from 'client/components/EditorWYSIWYG/InvalidLinksTooltip'
import { EditorConfig } from 'client/components/EditorWYSIWYG/types'
import WithTooltip from 'client/components/Tooltips/WithTooltip'

import { useConfigs } from './hooks/useConfigs'
import { useHighlightFocusedLink } from './hooks/useHighlightFocusedLink'
import { useHighlightInvalidLinks } from './hooks/useHighlightInvalidLinks'
import { useLinkFormGuard } from './hooks/useLinkFormGuard'
import { useOnBlur } from './hooks/useOnBlur'
import { useValidationTooltip } from './hooks/useValidationTooltip'

export type EditorWYSIWYGProps = {
  className?: string
  disabled?: boolean
  focusedLink?: string
  id?: string
  invalidLinks?: Array<InvalidLink>
  onChange: (value?: string) => void
  options?: EditorConfig
  onlyLinks?: boolean
  repository?: boolean
  validationErrors?: Array<string>
  value: string
}

const EditorWYSIWYG: React.FC<EditorWYSIWYGProps> = (props: EditorWYSIWYGProps) => {
  const {
    className,
    disabled,
    focusedLink,
    id,
    invalidLinks,
    onChange,
    onlyLinks,
    options,
    repository,
    validationErrors = [],
    value,
  } = props

  const containerRef = useRef<HTMLDivElement>(null)
  const editorClassName = useRef<string>(`editor-${UUIDs.getUuid()}`)
  const { configs } = useConfigs({ onlyLinks, options, repository })
  const onSave = useLinkFormGuard({ onChange, value })
  const onBlur = useOnBlur({ onChange: onSave, value })
  const { hasValidationErrors, invalidLinksOnly, tooltip } = useValidationTooltip({ invalidLinks, validationErrors })
  useHighlightInvalidLinks({ containerRef, invalidLinks })
  useHighlightFocusedLink({ containerRef, focusedLink })

  return (
    <>
      <WithTooltip
        ref={containerRef}
        className={classNames(
          'editorWYSIWYG',
          editorClassName.current,
          { disabled, [className]: className },
          { 'invalid-links-only': invalidLinksOnly, 'validation-error': hasValidationErrors }
        )}
        id={id}
        tooltip={tooltip}
      >
        {disabled && <JoditEditor config={configs.configReadOnly} value={value} />}
        {!disabled && <JoditEditor config={configs.config} onBlur={onBlur} value={value} />}
        {!Objects.isEmpty(invalidLinks) && (
          <InvalidLinksTooltip editorClassName={editorClassName.current} invalidLinks={invalidLinks} />
        )}
      </WithTooltip>
      <AddFromRepository />
    </>
  )
}

export default EditorWYSIWYG
