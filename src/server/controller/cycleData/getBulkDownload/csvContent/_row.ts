import { i18n as i18nType } from 'i18next'

import { Country } from 'meta/area/country'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { Objects } from 'utils/objects'

import { getAreaLabel } from 'server/controller/cycleData/getBulkDownload/csvContent/_area'
import { GetDatumRecord, getDatumTableNode } from 'server/controller/cycleData/getBulkDownload/csvContent/_getDatum'
import { parseValue } from 'server/controller/cycleData/getBulkDownload/csvContent/_parsers'
import {
  BulkDownloadColType,
  BulkDownloadData,
  BulkDownloadDatumType,
  CSVRow,
  CSVRowOptions,
} from 'server/controller/cycleData/getBulkDownload/types'

import { climaticDomainVariables } from './_climaticDomainVariables'
import { getClimaticValue } from './_getClimaticValue'

type Props = {
  assessment: Assessment
  country: Country
  cycle: Cycle
  data: BulkDownloadData
  i18n: i18nType
  options: CSVRowOptions
}

export const getCSVRow = (props: Props): CSVRow => {
  const { assessment, country, cycle, data, i18n, options } = props
  const { name: assessmentName } = assessment.props
  const { name: cycleName } = cycle
  const { countryIso, regionCodes } = country
  const { colForestArea, colNodes, colYear, includeClimaticDomain, includeDeskStudy } = options

  const row: CSVRow = []

  const regionLabels = regionCodes.map((code) => getAreaLabel({ code, i18n })).join(',')
  const countryLabel = getAreaLabel({ code: countryIso, i18n })
  row.push(parseValue(regionLabels, BulkDownloadDatumType.string))
  row.push(parseValue(countryIso, BulkDownloadDatumType.string))

  //==== desk study: why before country label ?
  if (includeDeskStudy) {
    const deskStudy = country.props.deskStudy ? i18n.t(`assessment.deskStudy`) : ''
    row.push(parseValue(deskStudy, BulkDownloadDatumType.string))
  }

  row.push(parseValue(countryLabel, BulkDownloadDatumType.string))

  //==== forestArea
  if (!Objects.isNil(colForestArea)) {
    const { colName, csvColumn, tableName, variableName } = colForestArea
    const propsValue = { assessmentName, countryIso, colName, csvColumn, cycleName, data, tableName, variableName }
    const value = getDatumTableNode(propsValue)
    row.push(parseValue(value))
  }

  //==== year
  if (!Objects.isNil(colYear)) {
    const value = colYear.replace('_', '-')
    row.push(parseValue(value, BulkDownloadDatumType.string))
  }

  //==== climatic domain
  if (includeClimaticDomain) {
    climaticDomainVariables.forEach((variableName) => {
      const climaticValue = getClimaticValue({ assessmentName, countryIso, cycleName, data, variableName })
      row.push(parseValue(climaticValue, BulkDownloadDatumType.string))
    })
  }

  //==== colNode values
  colNodes.forEach((colNode) => {
    const { colName, colType = BulkDownloadColType.tableNode, csvColumn, datumType, tableName, variableName } = colNode

    const getDatum = colNode.getDatum ?? GetDatumRecord[colType]
    if (!getDatum) throw new Error(`GetDatum not found {colNode:${JSON.stringify(colNode)}`)

    const propsValue = { assessmentName, countryIso, colName, csvColumn, cycleName, data, tableName, variableName }
    const value = getDatum(propsValue)

    row.push(parseValue(value, datumType))
  })

  return row
}
