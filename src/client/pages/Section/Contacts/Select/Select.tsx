import React, { useMemo } from 'react'

import Autocomplete from 'client/components/Autocomplete'

type Props = {
  value: string
  onChange: (params: { label: string; value: string }) => void
  disabled: boolean
  items: Array<{ label: string; value: string }>
}

const Select: React.FC<Props> = (props) => {
  const { value, onChange, disabled, items } = props

  const _value = useMemo(() => {
    return items.find((item) => {
      return item.value === value
    })?.label
  }, [items, value])

  return <Autocomplete readOnlyOptions disabled={disabled} onSave={onChange} value={_value || value} items={items} />
}

export default Select
