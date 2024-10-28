import './MultiValueSummary.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { MultiValueProps as OriginalMultiValueProps } from 'react-select'

import { SelectProps } from 'client/components/Inputs/Select/types'

type MultiValueProps = OriginalMultiValueProps & Pick<SelectProps, 'multiLabelSummaryKey'>

export const MultiValueSummary: React.FC<MultiValueProps> = (props) => {
  const { getValue, index, multiLabelSummaryKey } = props
  const count = getValue().length
  const { t } = useTranslation()

  const displayCountLabel = index === 0

  if (displayCountLabel) {
    return <span className="select__multiValue-label">{t(multiLabelSummaryKey, { count })}</span>
  }

  return null
}

export default MultiValueSummary
