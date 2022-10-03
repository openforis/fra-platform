import React from 'react'

import { ApiEndPoint } from '@meta/api/endpoint'

import Autocomplete from '@client/components/Autocomplete'
import { OnChangeTaxon } from '@client/pages/AssessmentSection/DataTable/Table/Row/RowData/Cell/hooks/useOnChange'

import { PropsCell } from '../props'

const Taxon: React.FC<PropsCell> = (props: PropsCell) => {
  const { onChange, datum, disabled } = props

  const _onChange: OnChangeTaxon = (value) => {
    // Handle first load ajax query call of onChange
    const isSame = value === datum || (typeof value !== 'string' && value?.scientificName === datum)
    if (isSame || !value) return
    onChange(value)
  }

  return (
    <div className="text-input__container validation-error-sensitive-field">
      <Autocomplete
        url={ApiEndPoint.ExtData.Taxa.search()}
        listbox={{
          displayField: 'scientificName',
        }}
        onChange={_onChange}
        disabled={disabled}
        value={datum}
      />
    </div>
  )
}

export default Taxon
