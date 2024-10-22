import './MultiValueSummary.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { MultiValueProps as OriginalMultiValueProps } from 'react-select'

import { Option, SelectProps } from 'client/components/Inputs/Select/types'

type MultiValueProps = OriginalMultiValueProps & Pick<SelectProps, 'multiLabelSummaryKey'>

export const MultiValueSummary: React.FC<MultiValueProps> = (props) => {
  const { getValue, index, multiLabelSummaryKey } = props
  const { t } = useTranslation()

  const displayCountLabel = index === 0

  if (displayCountLabel) {
    const count = Array.from(new Set(getValue().map((v) => (v as Option).value))).length
    return <span className="select__multiValue-label">{t(multiLabelSummaryKey, { count })}</span>
  }

  return null
}

export default MultiValueSummary
