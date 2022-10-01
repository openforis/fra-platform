import React, { useEffect, useState } from 'react'

import { ApiEndPoint } from '@meta/api/endpoint'
import { Taxon as TaxonType } from '@meta/extData/taxon'

import { useGetRequest } from '@client/hooks'
import Autocomplete from '@client/components/Autocomplete'

import { PropsCell } from '../props'

const Taxon: React.FC<PropsCell> = (props: PropsCell) => {
  const { onChange, datum, disabled } = props

  const [value, setValue] = useState(datum)

  const onQueryChange = (query: string) => {
    setValue(query)
  }

  const { data, dispatch: fetchData } = useGetRequest(ApiEndPoint.ExtData.Taxa.search(), {
    params: {
      query: value,
    },
  })

  useEffect(() => {
    // TODO: Throttle
    if (value?.length > 2) fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return (
    <div className="fra-table__select-container">
      <Autocomplete
        onQueryChange={onQueryChange}
        onChange={onChange}
        disabled={disabled}
        value={value}
        options={data?.map(({ scientificName, code }: TaxonType) => ({
          label: scientificName,
          value: code,
        }))}
      />
    </div>
  )
}

export default Taxon
