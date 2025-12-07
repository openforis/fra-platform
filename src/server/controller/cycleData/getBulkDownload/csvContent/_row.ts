import { i18n as i18nType } from 'i18next'

import { Country } from 'meta/area/country'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { DescriptionCountryValues } from 'meta/assessment/descriptionValue'
import { RecordAssessmentDatas } from 'meta/data/recordDatas'
import { Objects } from 'utils/objects'

import { getAreaLabel } from 'server/controller/cycleData/getBulkDownload/csvContent/_area'
import { parseDescription, parseValue } from 'server/controller/cycleData/getBulkDownload/csvContent/_parsers'
import {
  BulkDownloadColNodeType,
  BulkDownloadData,
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
  descriptions?: DescriptionCountryValues
  i18n: i18nType
  options: CSVRowOptions
}

export const getCSVRow = (props: Props): CSVRow => {
  const { assessment, country, cycle, data, descriptions, i18n, options } = props
  const { name: assessmentName } = assessment.props
  const { name: cycleName } = cycle
  const { countryIso, regionCodes } = country
  const { colDescriptions, colForestArea, colNodes, colYear, includeClimaticDomain, includeDeskStudy } = options

  const row: CSVRow = []

  const regionLabels = regionCodes.map((code) => getAreaLabel({ code, i18n })).join(',')
  const countryLabel = getAreaLabel({ code: countryIso, i18n })
  row.push(parseValue(regionLabels, BulkDownloadColNodeType.string))
  row.push(parseValue(countryIso, BulkDownloadColNodeType.string))

  //==== desk study: why before country label ?
  if (includeDeskStudy) {
    const deskStudy = country.props.deskStudy ? i18n.t(`assessment.deskStudy`) : ''
    row.push(parseValue(deskStudy, BulkDownloadColNodeType.string))
  }

  row.push(parseValue(countryLabel, BulkDownloadColNodeType.string))

  //==== forestArea
  if (!Objects.isNil(colForestArea)) {
    const { colName, tableName, variableName } = colForestArea
    const propsValue = { assessmentName, countryIso, colName, cycleName, data, tableName, variableName }
    const value = RecordAssessmentDatas.getDatum(propsValue)
    row.push(parseValue(value))
  }

  //==== year
  if (!Objects.isNil(colYear)) {
    const value = colYear.replace('_', '-')
    row.push(parseValue(value, BulkDownloadColNodeType.string))
  }

  //==== climatic domain
  if (includeClimaticDomain) {
    climaticDomainVariables.forEach((variableName) => {
      const climaticValue = getClimaticValue({ assessmentName, countryIso, cycleName, data, variableName })
      row.push(parseValue(climaticValue, BulkDownloadColNodeType.string))
    })
  }

  //==== data table values
  colNodes.forEach((colValue) => {
    const { colName, csvColumn, getDatum, tableName, type, variableName } = colValue

    const getValue = getDatum ?? RecordAssessmentDatas.getDatum
    const propsValue = { assessmentName, countryIso, colName, csvColumn, cycleName, data, tableName, variableName }
    const value = getValue(propsValue)

    row.push(parseValue(value, type))
  })

  //==== descriptions
  colDescriptions?.forEach((colDescription) => {
    const { name, sectionName } = colDescription
    const value = descriptions?.[countryIso]?.[sectionName]?.[name]?.text

    const parsedValue = value ? parseDescription(value) : ''
    row.push(parseValue(parsedValue, BulkDownloadColNodeType.string))
  })

  return row
}
