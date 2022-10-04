import React from 'react'

import axios from 'axios'

import { ApiEndPoint } from '@meta/api/endpoint'
import { Taxon as TaxonType } from '@meta/extData/taxon'

import Autocomplete from '@client/components/Autocomplete'

import { PropsCell } from '../props'

const Taxon: React.FC<PropsCell> = (props: PropsCell) => {
  const { onChangeNodeValue, datum, disabled, nodeValue } = props
  const _onChange = (value: string | TaxonType) => {
    const isString = typeof value === 'string'
    // Handle first load ajax query call of onChange
    const isSame = value === datum || (!isString && value?.scientificName === datum)
    if (isSame || !value) return

    const nodeValueUpdate = { ...nodeValue }

    if (!isString && value?.code) {
      nodeValueUpdate.raw = value.scientificName
      nodeValueUpdate.taxonCode = value.code
    }

    if (isString) {
      // If previous version had a taxonCode
      // No inserting raw string
      nodeValueUpdate.raw = value
      delete nodeValueUpdate.taxonCode
    }

    onChangeNodeValue(nodeValueUpdate)
  }

  const listbox = {
    data: (query: string) =>
      axios
        .get(`${ApiEndPoint.ExtData.Taxa.search()}?query=${encodeURIComponent(query)}&limit=15`)
        .then(({ data }) => data),
    displayField: 'scientificName',
  }

  return (
    <div className="text-input__container validation-error-sensitive-field">
      <Autocomplete listbox={listbox} onChange={_onChange} disabled={disabled} value={datum} />
    </div>
  )
}

export default Taxon
