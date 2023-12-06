import React from 'react'
import { useTranslation } from 'react-i18next'

import { Labels } from 'meta/assessment'

import Select from 'client/components/Inputs/Select'

import { CellProps } from '../CellProps'

const CellSelect: React.FC<CellProps & { value: string }> = (props: CellProps & { value: string }) => {
  const { value, onChange, column, disabled } = props
  const { options } = column.props
  const { t } = useTranslation()

  // @ts-ignore
  const _options = options.map((option) => ({ ...option, label: t(Labels.getLabel(option.label)) }))
  const _value = _options.find((option) => option.value === value)

  return <Select disabled={disabled} value={_value} onChange={onChange} options={_options} />
}

export default CellSelect
