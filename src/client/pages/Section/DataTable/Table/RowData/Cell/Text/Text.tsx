import './Text.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { ColType } from 'meta/assessment'

import InputText from 'client/components/Inputs/InputText'
import TextArea from 'client/components/Inputs/TextArea'

import { PropsCell } from '../props'

const Text: React.FC<PropsCell> = (props) => {
  const { onChange, onPaste, col, nodeValue, disabled } = props
  const value = nodeValue?.raw || ''
  const { t } = useTranslation()

  const Component = col.props.colType === ColType.text ? InputText : TextArea
  const resize = col.props.colType === ColType.text ? true : undefined

  const { inputPlaceholder } = col.props

  return (
    <Component
      className="table-grid__data-cell-input-text"
      disabled={disabled}
      onChange={onChange}
      onPaste={onPaste}
      placeholder={t(inputPlaceholder)}
      resize={resize}
      value={value}
    />
  )
}

export default Text
