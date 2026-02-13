import { Country } from 'meta/area/country'
import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Assessments } from 'meta/assessment/assessments'
import { Cycle } from 'meta/assessment/cycle'
import { TableName, TableNames } from 'meta/assessment/table'
import { RecordAssessmentData } from 'meta/data/recordData'

import {
  BulkDownloadColType,
  BulkDownloadData,
  BulkDownloadMetadata,
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

  // Use getLastPublishedData to include voluntary updates from non-published cycles
  const lastPublishedCycle = Assessments.getLastPublishedCycle(assessment)
  if (lastPublishedCycle?.uuid === cycle.uuid) {
    return getLastPublishedData({ assessment, countryISOs, tableNames })
  }

  return getTableData({ assessment, countryISOs, cycle, mergeOdp: true, tableNames })
}

export const getData = async (props: Props): Promise<BulkDownloadData> => {
  const { assessment, countries, cycle, metadata } = props

  const countryISOs = countries.map<CountryIso>((country) => country.countryIso)
  const { sectionNames, tableNames } = getNames({ metadata })

  const [tables, descriptions, odp] = await Promise.all([
    _getTableData({ assessment, countryISOs, cycle, tableNames }),
    DescriptionRepository.getValues({ assessment, countryISOs, cycle, sectionNames }),
    OriginalDataPointRepository.getBulkDownloadData({ assessment, countryISOs, cycle }),
  ])

  return { descriptions, odp, tables }
}
