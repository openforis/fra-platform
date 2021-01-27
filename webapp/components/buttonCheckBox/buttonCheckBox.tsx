import './buttonCheckBox.less'
import React from 'react'
import { useI18n } from '@webapp/components/hooks'

type OwnProps = {
  onClick: (...args: any[]) => any
  label: any[] | string
  labelParam?: any
  className?: string
  checked: boolean
  suffix?: string
}
// @ts-expect-error ts-migrate(2456) FIXME: Type alias 'Props' circularly references itself.
type Props = OwnProps & typeof ButtonCheckBox.defaultProps
// @ts-expect-error ts-migrate(7022) FIXME: 'ButtonCheckBox' implicitly has type 'any' because... Remove this comment to see the full error message
const ButtonCheckBox = (props: Props) => {
  const i18n = useI18n()
  const { onClick, checked, className, labelParam, suffix } = props
  let { label } = props
  label = Array.isArray(label) ? label : [label]
  return (
    <button type="button" className={`btn-s btn-checkbox ${className}`} onClick={onClick}>
      <div className={`fra-checkbox${checked ? ' checked' : ''}`} />
      <div>{label.map((key: any) => `${labelParam ? (i18n as any).t(key, labelParam) : (i18n as any).t(key)} `)}</div>
      {suffix && <span className="suffix">{suffix}</span>}
    </button>
  )
}
ButtonCheckBox.defaultProps = {
  className: '',
  labelParam: null,
  suffix: null,
}
export default ButtonCheckBox
