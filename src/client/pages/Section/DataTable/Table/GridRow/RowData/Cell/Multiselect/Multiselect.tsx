import React, { useEffect, useRef } from 'react'

import { Cols } from 'meta/assessment'

import { useCycle } from 'client/store/assessment'
import MultiSelect from 'client/components/MultiSelect'
import { PropsCell } from 'client/pages/Section/DataTable/Table/Row/RowData/Cell/props'
import { DOMs } from 'client/utils/dom'

const Multiselect: React.FC<PropsCell> = (props) => {
  const { onChangeNodeValue, col, nodeValue, disabled } = props

  const cycle = useCycle()
  const ref = useRef(null)

  const { labelKeyPrefix } = Cols.getSelectProps({ cycle, col })
  const options = Cols.getSelectOptions({ cycle, col })
  const value = nodeValue?.raw
  const values = Array.isArray(value) ? value : []

  useEffect(() => {
    if (ref) {
      const row = ref.current.closest('tr')
      if (row) {
        const { height } = DOMs.elementOffset(ref.current.querySelector('.multi-select__closed-content span'))
        row.style.height = height < 40 ? '40px' : `${height}px`
      }
    }
  }, [ref, value])

  return (
    <div ref={ref} className="fra-table__select-container multiple">
      <MultiSelect
        disabled={disabled}
        onChange={(values: Array<string>) => {
          onChangeNodeValue({ ...nodeValue, raw: values })
        }}
        options={options.map((option) => ({ label: `${labelKeyPrefix}.${option.name}`, value: option.name }))}
        values={values}
      />
    </div>
  )
}

export default Multiselect
