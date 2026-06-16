import { i18n as i18nType } from 'i18next'

import { Objects } from 'utils/objects'

import { CSVRow, CSVRowOptions } from 'server/controller/cycleData/bulkDownload/types'

import { climaticDomainVariables } from './_climaticDomainVariables'

type Props = {
  i18n: i18nType
  options: CSVRowOptions
}

const climaticDomainVariableHeaders = climaticDomainVariables.map((variable) => variable.replace('_', ''))

export const getCSVRowHeader = (props: Props): CSVRow => {
  const { i18n, options } = props
  const { colForestArea, colNodes, colYear, includeClimaticDomain, includeDeskStudy, includeFlag } = options

  const row = ['regions', 'subregions', 'iso3', 'iso2', 'm49', 'name']

  if (includeDeskStudy) {
    row.push(i18n.t(`assessment.deskStudy`))
  }

  if (!Objects.isNil(colForestArea)) {
    row.push(colForestArea.csvColumn)
  }
  if (!Objects.isNil(colYear)) {
    row.push('year')
  }
  if (includeClimaticDomain) {
    row.push(...climaticDomainVariableHeaders)
  }

  colNodes.forEach((colValue) => {
    row.push(colValue.csvColumn)
    if (includeFlag) row.push(`${colValue.csvColumn}_flag`)
  })

  return row
}
