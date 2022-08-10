import './CollaboratorMultiSelect.scss'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from '@core/utils'
import classNames from 'classnames'

import { SubSection } from '@meta/assessment'
import { CollaboratorProps } from '@meta/user'

import { useAssessmentSections } from '@client/store/assessment'

type Props = {
  properties: CollaboratorProps
  disabled?: boolean
}

const CollaboratorMultiSelect: React.FC<Props> = ({ properties, disabled }) => {
  const { i18n } = useTranslation()
  const ref = useRef(null)

  const [open, setOpen] = useState<boolean>(false)

  const assessmentSections = useAssessmentSections()

  const sections = Objects.isEmpty(properties) ? 'none' : properties.sections

  const values: Array<string> = typeof sections === 'string' ? [sections] : Object.keys(sections)

  const [selectedOptions, setSelectedOptions] = useState<Array<string>>(values)

  const options = [
    'all',
    'none',
    ...assessmentSections
      .reduce((prev, curr) => [...prev, ...curr.subSections], [])
      .filter((subSection: SubSection) => subSection.props.anchor)
      .map((subSection: SubSection): string => subSection.props.anchor),
  ]

  const localizeOption = (option: string) =>
    ['all', 'none'].includes(option) ? i18n.t(`contactPersons.${option}`) : option

  const removeOption = (option: string): void => {
    if (option === 'all') setSelectedOptions(['none'])
    else if (option === 'none') setSelectedOptions(['all'])
    else setSelectedOptions(selectedOptions.filter((opt) => opt !== option))
  }

  const addOption = (option: string): void => {
    setSelectedOptions(
      ['all', 'none'].includes(option)
        ? [option]
        : [...selectedOptions.filter((opt) => !['all', 'none'].includes(opt)), option]
    )
  }

  const toggleOption = (option: string): void =>
    selectedOptions.includes(option) ? removeOption(option) : addOption(option)

  const handleClickOutside = (e: MouseEvent) =>
    ref?.current && ref.current && !ref.current.contains(e.target) && setOpen(false)

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <div
      ref={ref}
      className={classNames({ 'multi-select': !disabled, 'has-focus': open })}
      onMouseDown={disabled ? null : () => setOpen(!open)}
      onFocus={() => (disabled ? null : setOpen(true))}
      onBlur={() => (disabled ? null : setOpen(false))}
    >
      <div className="multi-select__closed-content">
        {Objects.isEmpty(selectedOptions) ? (
          <span className="multi-select__placeholder">{i18n.t<string>('multiSelect.placeholder')}</span>
        ) : (
          selectedOptions.map((value) => localizeOption(value)).join(', ')
        )}
      </div>
      {disabled ? null : (
        <div className="multi-select__opened-content-anchor">
          {open ? (
            <div className="multi-select__opened">
              {options.map((option: string) => (
                <div
                  className="multi-select__opened-item"
                  key={option}
                  onClick={() => toggleOption(option)}
                  onMouseDown={(e) => e.stopPropagation()}
                  aria-hidden="true"
                >
                  <span className={classNames('fra-checkbox', { checked: selectedOptions.includes(option) })} />
                  <span className="multi-select__opened-item-label">{localizeOption(option)}</span>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}

CollaboratorMultiSelect.defaultProps = {
  disabled: false,
}

export default CollaboratorMultiSelect
