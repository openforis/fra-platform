import React, { useEffect, useRef } from 'react'

import MultiSelect from 'client/components/MultiSelect'
import { PropsCell } from 'client/pages/AssessmentSection/DataTable/Table/Row/RowData/Cell/props'
import { DOMs } from 'client/utils/dom'

const Multiselect: React.FC<PropsCell> = (props) => {
  const { onChangeNodeValue, col, nodeValue, disabled } = props
  const { options, labelKeyPrefix } = col.props.select

  const value = nodeValue?.raw

  const values = Array.isArray(value) ? value : []

  const ref = useRef(null)

  useEffect(() => {
    if (ref) {
      const row = ref.current.closest('tr')
      if (row) {
        const { height } = DOMs.elementOffset(ref.current.querySelector('.multi-select__closed-content'))
        row.style.height = height < 40 ? '40px' : `${height}px`
      }
    }
  }, [ref, value])

  return (
    <div className="fra-table__select-container multiple" ref={ref}>
      <MultiSelect
        disabled={disabled}
        options={options.map((option) => ({ label: `${labelKeyPrefix}.${option.name}`, value: option.name }))}
        values={values}
        onChange={(values: Array<string>) => {
          onChangeNodeValue({ ...nodeValue, raw: values })
        }}
      />
    </div>
  )
}

export default Multiselect
