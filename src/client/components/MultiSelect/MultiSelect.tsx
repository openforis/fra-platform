import './MultiSelect.scss'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from '@utils/objects'
import classNames from 'classnames'

const optionClick = (currentValues: string[], onChange: (values: string[]) => void, option: string) => (evt: any) => {
  evt.stopPropagation()
  if (currentValues.includes(option)) {
    onChange(currentValues.filter((value) => option !== value))
  } else {
    onChange([...currentValues, option])
  }
}
type Props = {
  localizationPrefix?: string
  options: string[]
  values: string[]
  onChange: (values: string[]) => void
  disabled?: boolean
}

export const MultiSelect: React.FC<Props> = (props: Props) => {
  const { localizationPrefix, options, values, onChange, disabled } = props
  const multiselectRef = useRef<HTMLDivElement>()
  const [open, setOpen] = useState<boolean>(false)
  const { t } = useTranslation()
  const isValuesEmpty = Objects.isEmpty(values)

  const localizeOption = (option: string) => {
    const prefix = localizationPrefix ? `${localizationPrefix}.` : ''
    return t(`${prefix}${option}`)
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

  // @ts-ignore
  // @ts-ignore
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
          values.map(localizeOption).join(', ')
        )}
      </div>
      <div className="multi-select__opened-content-anchor">
        {open && (
          <div className="multi-select__opened">
            {options.map((option: string) => (
              <div
                role="presentation"
                className="multi-select__opened-item"
                key={option}
                onMouseDown={(e) => e.stopPropagation()}
                onClick={optionClick(values, onChange, option)}
              >
                <span className={classNames(`fra-checkbox`, { checked: values.includes(option) })} />
                <span className="multi-select__opened-item-label">{localizeOption(option)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

MultiSelect.defaultProps = {
  localizationPrefix: undefined,
  disabled: undefined,
}

export default MultiSelect
