import { CSVRow } from 'server/controller/cycleData/getBulkDownload/types'

import { climaticDomainVariables } from './_climaticDomainVariables'
import { CSVRowHeaderOptions } from './_types'

type Props = {
  options: CSVRowHeaderOptions
}

export const getCSVRowHeader = (props: Props): CSVRow => {
  const { options } = props
  const { colValues } = options

  const row = ['regions', 'iso3', 'name']

  if ('includeYear' in options && options.includeYear) {
    row.push('year')
  }
  if (options.includeClimaticDomain) {
    row.push(...climaticDomainVariables)
  }

  colValues.forEach((colValue) => {
    row.push(colValue.csvColumn)
  })

  return row
}
