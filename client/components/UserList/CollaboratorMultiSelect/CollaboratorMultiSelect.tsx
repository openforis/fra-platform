import './CollaboratorMultiSelect.scss'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from '@core/utils'
import classNames from 'classnames'

import { SubSection } from '@meta/assessment'
import { CollaboratorProps, User } from '@meta/user'

import { useAppDispatch } from '@client/store'
import { useAssessmentSections } from '@client/store/assessment'
import { UserManagementActions } from '@client/store/userManagement'

type Option = {
  value: string
  label: string
}

type Props = {
  user: User
  disabled?: boolean
}

const CollaboratorMultiSelect: React.FC<Props> = ({ user, disabled }) => {
  const dispatch = useAppDispatch()
  const { i18n } = useTranslation()

  const ref = useRef(null)
  const firstUpdate = useRef(true)

  const [open, setOpen] = useState<boolean>(false)

  const assessmentSections = useAssessmentSections()

  const optionAll = { value: 'all', label: 'all' }
  const optionNone = { value: 'none', label: 'none' }
  const options = [
    optionAll,
    optionNone,
    ...assessmentSections
      .reduce((prev, curr) => [...prev, ...curr.subSections], [])
      .filter((subSection: SubSection) => subSection.props.anchor)
      .map((subSection: SubSection): { value: string; label: string } => {
        return { value: subSection.uuid.replaceAll('-', ''), label: subSection.props.anchor }
      }),
  ]
  const properties = (user.roles[0].props as unknown as CollaboratorProps) || undefined
  const sections = Objects.isEmpty(properties) ? 'none' : properties.sections
  const selectedValues: Array<string> = typeof sections === 'string' ? [sections] : Object.keys(sections)

  const [selectedOptions, setSelectedOptions] = useState<Array<Option>>(
    selectedValues.map((selectedValue) => {
      const option = options.find((opt) => opt.value === selectedValue)
      return {
        value: selectedValue,
        label: option ? option.label : 'ooo',
      }
    })
  )

  const localizeOption = (option: Option) => {
    const { value, label } = option
    return ['all', 'none'].includes(value) ? i18n.t(`contactPersons.${label}`) : label
  }

  const removeOption = (option: Option): void => {
    const { value } = option
    if (value === 'all') setSelectedOptions([optionNone])
    else if (value === 'none') setSelectedOptions([optionAll])
    else setSelectedOptions(selectedOptions.filter((opt) => opt.value !== value))
  }

  const addOption = (option: Option): void => {
    const { value } = option
    if (value === 'all') setSelectedOptions([optionAll])
    else if (value === 'none') setSelectedOptions([optionNone])
    else setSelectedOptions([...selectedOptions.filter((opt) => !['all', 'none'].includes(opt.value)), option])
  }

  const toggleOption = (option: Option): void =>
    selectedOptions.find((opt) => opt.value === option.value) ? removeOption(option) : addOption(option)

  const handleClickOutside = (e: MouseEvent) =>
    ref?.current && ref.current && !ref.current.contains(e.target) && setOpen(false)

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false
      return
    }
    dispatch(
      UserManagementActions.updateCountryAccess({
        id: user.roles[0].id,
        sections: selectedOptions.reduce((prev, curr) => {
          return { ...prev, [curr.value]: true }
        }, {}),
      })
    )
  }, [dispatch, selectedOptions, user.id, user.roles])

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
          selectedOptions.map((selectedOption) => localizeOption(selectedOption)).join(', ')
        )}
      </div>
      {disabled ? null : (
        <div className="multi-select__opened-content-anchor">
          {open ? (
            <div className="multi-select__opened">
              {options.map((option: Option) => (
                <div
                  className="multi-select__opened-item"
                  key={option.value}
                  onClick={() => toggleOption(option)}
                  onMouseDown={(e) => e.stopPropagation()}
                  aria-hidden="true"
                >
                  <span
                    className={classNames('fra-checkbox', {
                      checked: selectedOptions.find((opt) => opt.value === option.value),
                    })}
                  />
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
