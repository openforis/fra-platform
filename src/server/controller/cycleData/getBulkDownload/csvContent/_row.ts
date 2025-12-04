import { i18n as i18nType } from 'i18next'

import { AreaCode } from 'meta/area/areaCode'
import { Areas } from 'meta/area/areas'
import { Country } from 'meta/area/country'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { RecordAssessmentData } from 'meta/data/recordData'
import { RecordAssessmentDatas } from 'meta/data/recordDatas'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { BulkDownloadVariableType, CSVRow, CSVValue } from 'server/controller/cycleData/getBulkDownload/types'

import { climaticDomainVariables } from './_climaticDomainVariables'
import { getClimaticValue } from './_getClimaticValue'
import { CSVRowOptions } from './_types'

type Props = {
  assessment: Assessment
  country: Country
  cycle: Cycle
  data: RecordAssessmentData
  i18n: i18nType
  options: CSVRowOptions
}

const getAreaLabel = (props: { code: AreaCode; i18n: i18nType }): string => {
  const { code, i18n } = props
  return i18n.t(Areas.getTranslationKey(code))
}

const parseValue = (value: string, type: BulkDownloadVariableType = BulkDownloadVariableType.number): CSVValue => {
  let parsedValue = ''
  if (!Objects.isEmpty(value)) {
    parsedValue = value.replace(/"/g, '').replace(/\n/g, '').replace(/\r/g, '')
    if (type === 'number' && Numbers.toBigNumber(value).isFinite()) {
      parsedValue = Numbers.toFixed(parsedValue)
    }
  }
  return `"${parsedValue}"`
}

export const getCSVRow = (props: Props): CSVRow => {
  const { assessment, country, cycle, data, i18n, options } = props
  const { name: assessmentName } = assessment.props
  const { name: cycleName } = cycle
  const { countryIso, regionCodes } = country
  const { colValues, includeClimaticDomain, includeDeskStudy } = options

  const row: CSVRow = []

  const regionLabels = regionCodes.map((code) => getAreaLabel({ code, i18n })).join(',')
  const countryLabel = getAreaLabel({ code: countryIso, i18n })
  row.push(parseValue(regionLabels, BulkDownloadVariableType.string))
  row.push(parseValue(countryIso, BulkDownloadVariableType.string))

  if (includeDeskStudy) {
    const deskStudy = country.props.deskStudy ? i18n.t(`assessment.deskStudy`) : ''
    row.push(parseValue(deskStudy, BulkDownloadVariableType.string))
  }

  row.push(parseValue(countryLabel, BulkDownloadVariableType.string))

  if ('forestArea' in options) {
    const { colName, tableName, variableName } = options.forestArea
    const propsValue = { assessmentName, countryIso, colName, cycleName, data, tableName, variableName }
    const forestArea = RecordAssessmentDatas.getDatum(propsValue)
    row.push(parseValue(forestArea))
  }

  if ('includeYear' in options && options.includeYear) {
    const year = options.year.replace('_', '-')
    row.push(parseValue(year, BulkDownloadVariableType.string))
  }

  if (includeClimaticDomain) {
    climaticDomainVariables.forEach((variableName) => {
      const climaticValue = getClimaticValue({ assessmentName, countryIso, cycleName, data, variableName })
      row.push(parseValue(climaticValue, BulkDownloadVariableType.string))
    })
  }

  colValues.forEach((colValue) => {
    const { colName, csvColumn, getDatum, tableName, type, variableName } = colValue

    const getValue = getDatum ?? RecordAssessmentDatas.getDatum
    const propsValue = { assessmentName, countryIso, colName, csvColumn, cycleName, data, tableName, variableName }
    const value = getValue(propsValue)

    row.push(parseValue(value, type))
  })

  return row
}
