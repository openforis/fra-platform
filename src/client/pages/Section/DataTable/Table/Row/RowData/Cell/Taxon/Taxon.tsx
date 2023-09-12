import React from 'react'

import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { Taxon as TaxonType } from 'meta/extData/taxon'

import Autocomplete from 'client/components/Autocomplete'

import { PropsCell } from '../props'

const Taxon: React.FC<PropsCell> = (props: PropsCell) => {
  const { onChangeNodeValue, onPaste, disabled, nodeValue } = props
  const [items, setItems] = React.useState([])

  const onSave = (value: string | TaxonType) => {
    const isString = typeof value === 'string'
    // Handle first load ajax query call of onChange
    const isSame = value === nodeValue.raw || (!isString && value?.scientificName === nodeValue.raw)
    if (isSame || !value) return

    const nodeValueUpdate = { ...nodeValue }

    if (!isString && value.code) {
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

  const fetchAutocomplete = async (query: string) => {
    const { data } = await axios.get(ApiEndPoint.ExtData.Taxa.search(), {
      params: {
        query,
        limit: 15,
      },
    })
    setItems(data)
  }

  const onInputValueChange = async (inputValue: string) => {
    if (!inputValue) {
      return
    }
    await fetchAutocomplete(inputValue)
  }

  return (
    <div title={nodeValue.raw ?? ''} className="text-input__container validation-error-sensitive-field">
      <Autocomplete
        disabled={disabled}
        items={items.map((item) => ({ value: item, label: item.scientificName }))}
        name="taxon"
        onInputValueChange={onInputValueChange}
        onSave={onSave}
        onPaste={onPaste}
        value={nodeValue.raw}
      />
    </div>
  )
}

export default Taxon
