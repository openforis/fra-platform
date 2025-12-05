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
  const { colDescriptions, colForestArea, colValues, colYear, includeClimaticDomain, includeDeskStudy } = options

  const row = ['regions', 'iso3']

  if (includeDeskStudy) {
    row.push('deskStudy')
  }

  row.push('name')

  if (!Objects.isNil(colForestArea)) {
    row.push(`forest area ${colForestArea.colName}`)
  }
  if (!Objects.isNil(colYear)) {
    row.push('year')
  }
  if (includeClimaticDomain) {
    row.push(...climaticDomainVariableHeaders)
  }

  colValues.forEach((colValue) => {
    row.push(colValue.csvColumn)
  })

  colDescriptions?.forEach((description) => {
    const { csvColumn, name } = description
    row.push(csvColumn ?? name)
  })

  return row
}
