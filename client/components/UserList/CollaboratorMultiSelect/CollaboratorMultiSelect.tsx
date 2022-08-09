import './CollaboratorMultiSelect.scss'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from '@core/utils'
import classNames from 'classnames'

import { SubSection } from '@meta/assessment'
import { CollaboratorProps } from '@meta/user'

import { useAssessmentSections } from '@client/store/assessment'

type Option = {
  tableNo: string
  section: string
  label: string
}

const optionAll: Option = { tableNo: 'all', section: 'all', label: 'contactPersons.all' }
const optionNone: Option = { tableNo: 'none', section: 'none', label: 'contactPersons.none' }

type Props = {
  properties: CollaboratorProps
  disabled?: boolean
}

const CollaboratorMultiSelect: React.FC<Props> = ({ properties, disabled }) => {
  const { i18n } = useTranslation()
  const ref = useRef(null)

  const [open, setOpen] = useState<boolean>(false)

  const assessmentSections = useAssessmentSections()

  const options = [
    optionAll,
    optionNone,
    ...assessmentSections
      .reduce((prev, curr) => [...prev, ...curr.subSections], [])
      .filter((subSection: SubSection) => subSection.props.anchor)
      .map((subSection: SubSection): Option => {
        return {
          tableNo: subSection.props.anchor,
          section: '',
          label: subSection.props.name,
        }
      }),
  ]

  const sections = Objects.isEmpty(properties) ? 'none' : properties.sections

  const values: Array<string> = typeof sections === 'string' ? [sections] : Object.keys(sections)

  const localizeOption = (option: Option) =>
    [optionAll.tableNo, optionNone.tableNo].includes(option.tableNo) ? i18n.t(option.label) : option.tableNo

  const addOption = (): void => null

  const removeOption = (): void => null

  const toggleOption = (option: Option): void => (values.includes(option.tableNo) ? removeOption() : addOption())

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
        {Objects.isEmpty(values) ? (
          <span className="multi-select__placeholder">{i18n.t<string>('multiSelect.placeholder')}</span>
        ) : (
          values.map((value) => i18n.t(value)).join(', ')
        )}
      </div>
      {disabled ? null : (
        <div className="multi-select__opened-content-anchor">
          {open ? (
            <div className="multi-select__opened">
              {options.map((option: Option) => (
                <div
                  className="multi-select__opened-item"
                  key={option.tableNo}
                  onClick={() => toggleOption(option)}
                  onMouseDown={(e) => e.stopPropagation()}
                  aria-hidden="true"
                >
                  <span className={classNames('fra-checkbox', { checked: values.includes(option.tableNo) })} />
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
