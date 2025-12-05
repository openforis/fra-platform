import { Objects } from 'utils/objects'

import { CSVRow } from 'server/controller/cycleData/getBulkDownload/types'

import { climaticDomainVariables } from './_climaticDomainVariables'
import { CSVRowOptions } from './_types'

type Props = {
  options: CSVRowOptions
}

const climaticDomainVariableHeaders = climaticDomainVariables.map((variable) => variable.replace('_', ''))

export const getCSVRowHeader = (props: Props): CSVRow => {
  const { options } = props
  const { colValues, forestArea, includeClimaticDomain, includeDeskStudy, year } = options

  const row = ['regions', 'iso3']

  if (includeDeskStudy) {
    row.push('deskStudy')
  }

  row.push('name')

  if (!Objects.isNil(forestArea)) {
    row.push(`forest area ${options.forestArea.colName}`)
  }
  if (!Objects.isNil(year)) {
    row.push('year')
  }
  if (includeClimaticDomain) {
    row.push(...climaticDomainVariableHeaders)
  }

  colValues.forEach((colValue) => {
    row.push(colValue.csvColumn)
  })

  return row
}
