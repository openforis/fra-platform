import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import Autocomplete from 'client/components/Autocomplete'
import { Option } from 'client/components/Select/types'

type Props = {
  value: string
  onChange: (params: Option) => void
  disabled: boolean
  items: Array<Option>
}

const Select: React.FC<Props> = (props) => {
  const { value, onChange, disabled, items: _items } = props
  const { t } = useTranslation()

  const items = _items.map((item) => ({
    ...item,
    label: t(item.label),
  }))

  const _value = useMemo(() => {
    return items.find((item) => {
      return item.value === value
    })?.label
  }, [items, value])

  return <Autocomplete readOnlyOptions disabled={disabled} onSave={onChange} value={_value || value} items={items} />
}

export default Select
