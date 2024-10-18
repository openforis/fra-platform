import React from 'react'
import { useTranslation } from 'react-i18next'
import { MultiValueProps as OriginalMultiValueProps } from 'react-select'

import { SelectProps } from 'client/components/Inputs/Select/types'

type MultiValueProps = OriginalMultiValueProps & Pick<SelectProps, 'multiLabelKey'>

export const MultiValue: React.FC<MultiValueProps> = (props) => {
  const { getValue, index, multiLabelKey } = props
  const count = getValue().length
  const { t } = useTranslation()

  const displayCountLabel = index === 0

  if (displayCountLabel) {
    return <span>{t(multiLabelKey, { count })}</span>
  }

  return null
}

export default MultiValue
