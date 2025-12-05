import { Country } from 'meta/area/country'
import { CountryIso } from 'meta/area/countryIso'
import { DescriptionCountryValues } from 'meta/assessment/descriptionValue'
import { TableName, TableNames } from 'meta/assessment/table'
import { RecordAssessmentData } from 'meta/data/recordData'

import { BulkDownloadMetadata, PropsBulkDownload } from 'server/controller/cycleData/getBulkDownload/types'
import { getTableData } from 'server/controller/cycleData/getTableData'
import { DescriptionRepository } from 'server/db/repository/assessmentCycle/descriptions'

type Props = PropsBulkDownload & { countries: Array<Country>; metadata: BulkDownloadMetadata }

const getNames = (props: {
  metadata: BulkDownloadMetadata
}): { sectionNames: Array<string>; tableNames: Array<TableName> } => {
  const { metadata } = props

  const tableNames = new Set<string>()
  const sectionNames = new Set<string>()

  metadata.years.forEach((year) => {
    return year.tables.forEach((table) => {
      tableNames.add(table.tableName)
    })
  })

  metadata.files.forEach((file) => {
    file.colNodes.forEach((column) => {
      tableNames.add(column.tableName)
    })
    file.colDescriptions?.forEach((description) => {
      sectionNames.add(description.sectionName)
    })
  })

  tableNames.add(TableNames.climaticDomain)

  return { sectionNames: Array.from(sectionNames), tableNames: Array.from(tableNames) }
}

type Returned = [RecordAssessmentData, DescriptionCountryValues]

export const getData = (props: Props): Promise<Returned> => {
  const { assessment, countries, cycle, metadata } = props

  const countryISOs = countries.map<CountryIso>((country) => country.countryIso)
  const { sectionNames, tableNames } = getNames({ metadata })

  return Promise.all([
    getTableData({ assessment, cycle, countryISOs, tableNames, mergeOdp: true }),
    DescriptionRepository.getValues({ assessment, cycle, countryISOs, sectionNames }),
  ])
}
