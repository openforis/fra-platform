import { Country } from 'meta/area/country'
import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Assessments } from 'meta/assessment/assessments'
import { Cycle, CycleName } from 'meta/assessment/cycle'
import { DescriptionCountryValues } from 'meta/assessment/descriptionValue'
import { SectionName } from 'meta/assessment/section'
import { TableName, TableNames } from 'meta/assessment/table'
import { RecordAssessmentData } from 'meta/data/recordData'

import { AreaController } from 'server/controller/area'
import {
  BulkDownloadColType,
  BulkDownloadData,
  BulkDownloadMetadata,
  BulkDownloadODPData,
  PropsBulkDownload,
} from 'server/controller/cycleData/getBulkDownload/types'
import { getLastPublishedData } from 'server/controller/cycleData/getLastPublishedData'
import { getTableData } from 'server/controller/cycleData/getTableData'
import { DescriptionRepository } from 'server/db/repository/assessmentCycle/descriptions'
import { OriginalDataPointRepository } from 'server/db/repository/assessmentCycle/originalDataPoint'

type Props = PropsBulkDownload & { countries: Array<Country>; metadata: BulkDownloadMetadata }

const getNames = (props: {
  metadata: BulkDownloadMetadata
}): { sectionNames: Array<string>; tableNames: Array<TableName> } => {
  const { metadata } = props

  const tableNames = new Set<string>([TableNames.climaticDomain])
  const sectionNames = new Set<string>()

  metadata.files.forEach((file) => {
    const row = file.rows.at(0)
    row.colNodes.forEach((column) => {
      const { colType = BulkDownloadColType.tableNode } = column
      if (colType === BulkDownloadColType.tableNode) {
        tableNames.add(column.tableName)
      }
      if (colType === BulkDownloadColType.description) {
        sectionNames.add(column.tableName)
      }
    })
  })

  return { sectionNames: Array.from(sectionNames), tableNames: Array.from(tableNames) }
}

const _getTableData = async (props: {
  assessment: Assessment
  countryISOs: Array<CountryIso>
  cycle: Cycle
  tableNames: Array<string>
}): Promise<RecordAssessmentData> => {
  const { assessment, countryISOs, cycle, tableNames } = props

  // Include last published country data, only if exporting data for the last published cycle
  const lastPublishedCycle = Assessments.getLastPublishedCycle(assessment)
  if (lastPublishedCycle?.uuid === cycle.uuid) {
    return getLastPublishedData({ assessment, countryISOs, tableNames })
  }

  return getTableData({ assessment, countryISOs, cycle, mergeOdp: true, tableNames })
}

const _getDescriptions = async (props: {
  assessment: Assessment
  countryISOs: Array<CountryIso>
  cycle: Cycle
  sectionNames: Array<SectionName>
}): Promise<DescriptionCountryValues> => {
  const { assessment, countryISOs, cycle, sectionNames } = props

  const lastPublishedCycle = Assessments.getLastPublishedCycle(assessment)
  if (lastPublishedCycle?.uuid !== cycle.uuid) {
    return DescriptionRepository.getValues({ assessment, countryISOs, cycle, sectionNames })
  }

  const countriesMap = await AreaController.getCountriesMap({ assessment, cycle: lastPublishedCycle })

  // Map of: cycle name - array of countries - used to split data fetching
  const cycleCountries = countryISOs.reduce<Record<CycleName, Array<CountryIso>>>((acc, countryIso) => {
    const country = countriesMap[countryIso]
    const { cycleName } = country.lastPublishedInfo
    if (!acc[cycleName]) acc[cycleName] = []
    acc[cycleName].push(countryIso)
    return acc
  }, {})

  const dataArray = await Promise.all(
    Object.entries(cycleCountries).map(async ([cycleName, countryIsos]) => {
      const countryCycle = Assessments.getCycle({ assessment, cycleName: cycleName as CycleName })
      return DescriptionRepository.getValues({
        assessment,
        countryISOs: countryIsos,
        cycle: countryCycle,
        sectionNames,
      })
    })
  )

  return dataArray.reduce<DescriptionCountryValues>((acc, data) => ({ ...acc, ...data }), {})
}

const _getODPData = async (props: {
  assessment: Assessment
  countryISOs: Array<CountryIso>
  cycle: Cycle
}): Promise<BulkDownloadODPData> => {
  const { assessment, countryISOs, cycle } = props

  const lastPublishedCycle = Assessments.getLastPublishedCycle(assessment)
  if (lastPublishedCycle?.uuid !== cycle.uuid) {
    return OriginalDataPointRepository.getBulkDownloadData({ assessment, countryISOs, cycle })
  }

  const countriesMap = await AreaController.getCountriesMap({ assessment, cycle: lastPublishedCycle })

  const cycleCountries = countryISOs.reduce<Record<CycleName, Array<CountryIso>>>((acc, countryIso) => {
    const country = countriesMap[countryIso]
    const { cycleName } = country.lastPublishedInfo
    if (!acc[cycleName]) acc[cycleName] = []
    acc[cycleName].push(countryIso)
    return acc
  }, {})

  const dataArray = await Promise.all(
    Object.entries(cycleCountries).map(async ([cycleName, countryIsos]) => {
      const countryCycle = Assessments.getCycle({ assessment, cycleName: cycleName as CycleName })
      return OriginalDataPointRepository.getBulkDownloadData({
        assessment,
        countryISOs: countryIsos,
        cycle: countryCycle,
      })
    })
  )

  return dataArray.reduce<BulkDownloadODPData>((acc, data) => ({ ...acc, ...data }), {})
}

export const getData = async (props: Props): Promise<BulkDownloadData> => {
  const { assessment, countries, cycle, metadata } = props

  const countryISOs = countries.map<CountryIso>((country) => country.countryIso)
  const { sectionNames, tableNames } = getNames({ metadata })

  const [tables, descriptions, odp] = await Promise.all([
    _getTableData({ assessment, countryISOs, cycle, tableNames }),
    _getDescriptions({ assessment, countryISOs, cycle, sectionNames }),
    _getODPData({ assessment, countryISOs, cycle }),
  ])

  return { descriptions, odp, tables }
}
