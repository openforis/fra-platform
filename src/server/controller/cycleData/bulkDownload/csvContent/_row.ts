import { i18n as i18nType } from 'i18next'

import { Country } from 'meta/area/country'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { Objects } from 'utils/objects'

import { getAreaLabel } from 'server/controller/cycleData/bulkDownload/csvContent/_area'
import { getFlag } from 'server/controller/cycleData/bulkDownload/csvContent/_flag'
import { GetDatumRecord, getDatumTableNode } from 'server/controller/cycleData/bulkDownload/csvContent/_getDatum'
import { parseValue } from 'server/controller/cycleData/bulkDownload/csvContent/_parsers'
import {
  BulkDownloadColType,
  BulkDownloadData,
  BulkDownloadDatumType,
  CSVRow,
  CSVRowOptions,
  PropsGetDatum,
} from 'server/controller/cycleData/bulkDownload/types'

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

type PropsGetDatumBase = Pick<PropsGetDatum, 'assessmentName' | 'countryIso' | 'cycleName' | 'data' | 'i18n'>

export const getCSVRow = (props: Props): CSVRow => {
  const { assessment, country, cycle, data, i18n, options } = props
  const { name: assessmentName } = assessment.props
  const { name: cycleName } = cycle
  const { countryIso, countryIso2, m49, regionCodes = [], subregionCodes = [] } = country
  const { colForestArea, colNodes, colYear, includeClimaticDomain, includeDeskStudy, includeFlag } = options

  const row: CSVRow = []

  const regionLabels = regionCodes.map((code) => getAreaLabel({ code, i18n })).join(',')
  const subregionLabels = subregionCodes.map((code) => i18n.t(`area.${code}.listName`)).join(',')
  const countryLabel = getAreaLabel({ code: countryIso, i18n })
  row.push(parseValue(regionLabels, BulkDownloadDatumType.string))
  row.push(parseValue(subregionLabels, BulkDownloadDatumType.string))
  row.push(parseValue(countryIso, BulkDownloadDatumType.string))
  row.push(parseValue(countryIso2, BulkDownloadDatumType.string))
  row.push(parseValue(m49, BulkDownloadDatumType.string))
  row.push(parseValue(countryLabel, BulkDownloadDatumType.string))

  if (includeDeskStudy) {
    const deskStudy = country.props.deskStudy ? i18n.t(`yesNoTextSelect.yes`) : i18n.t(`yesNoTextSelect.no`)
    row.push(parseValue(deskStudy, BulkDownloadDatumType.string))
  }

  const deskStudy = country.props?.deskStudy
  const propsValueBase: PropsGetDatumBase = { assessmentName, countryIso, cycleName, data, i18n }
  //==== forestArea
  if (!Objects.isNil(colForestArea)) {
    const { colName, csvColumn, tableName, variableName } = colForestArea
    const propsValue = { ...propsValueBase, colName, csvColumn, tableName, variableName }
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
      const climaticValue = getClimaticValue({ ...propsValueBase, variableName })
      row.push(parseValue(climaticValue, BulkDownloadDatumType.string))
    })
  }

  //==== colNode values
  colNodes.forEach((colNode) => {
    const { colName, colType = BulkDownloadColType.tableNode, csvColumn, datumType, tableName, variableName } = colNode

    const getDatum = colNode.getDatum ?? GetDatumRecord[colType]
    if (!getDatum) throw new Error(`GetDatum not found {colNode:${JSON.stringify(colNode)}`)

    const propsValue = { ...propsValueBase, colName, csvColumn, tableName, variableName }
    const value = getDatum(propsValue)
    row.push(parseValue(value, datumType))

    if (includeFlag) {
      const flag = getFlag({ assessmentName, colName, countryIso, cycleName, data, deskStudy, tableName, variableName })
      row.push(parseValue(flag, BulkDownloadDatumType.string))
    }
  })

  return row
}
