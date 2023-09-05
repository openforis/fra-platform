import './MultiSelect.scss'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'
import { Objects } from 'utils/objects'

import { Option } from 'client/components/MultiSelect/option'

const optionClick = (currentValues: string[], onChange: (values: string[]) => void, option: string) => (evt: any) => {
  evt.stopPropagation()
  if (currentValues.includes(option)) {
    onChange(currentValues.filter((value) => option !== value))
  } else {
    onChange([...currentValues, option])
  }
}

type Props = {
  options: Array<Option>
  values: string[]
  onChange: (values: string[]) => void
  disabled?: boolean
}

export const MultiSelect: React.FC<Props> = (props: Props) => {
  const { options, values, onChange, disabled } = props
  const multiselectRef = useRef<HTMLDivElement>()
  const [open, setOpen] = useState<boolean>(false)
  const { t } = useTranslation()
  const isValuesEmpty = Objects.isEmpty(values)

  const localizeValue = (value: string) => {
    const option = options.find((option) => option.value === value) ?? { label: '' }
    return t(option.label)
  }

  useEffect(() => {
    const outsideClick = (event: any) => {
      if (multiselectRef.current && !multiselectRef.current.contains(event.target)) setOpen(false)
    }
    window.addEventListener('click', outsideClick)
    return () => {
      window.removeEventListener('click', outsideClick)
    }
  }, [])

  if (!values) return null

  return (
    <div
      ref={multiselectRef}
      role="presentation"
      onMouseDown={() => setOpen(open)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      onClick={() => setOpen(!open)}
      className={classNames(`multi-select`, { 'has-focus': open })}
      // @ts-ignore
      disabled={disabled}
    >
      <div className="multi-select__closed-content">
        {isValuesEmpty ? (
          <span className="multi-select__placeholder">{t('multiSelect.placeholder')}</span>
        ) : (
          <span>{values.map((value) => localizeValue(value)).join(', ')}</span>
        )}
      </div>
      <div className="multi-select__opened-content-anchor">
        {open && (
          <div className="multi-select__opened">
            {options.map(({ label, value }: Option) => (
              <div
                role="presentation"
                className="multi-select__opened-item"
                key={value}
                onMouseDown={(e) => e.stopPropagation()}
                onClick={optionClick(values, onChange, value)}
              >
                <span className={classNames(`fra-checkbox`, { checked: values.includes(value) })} />
                <span className="multi-select__opened-item-label">{t(label)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

MultiSelect.defaultProps = {
  disabled: undefined,
}

export default MultiSelect
