import { ODPDataSourceMethod } from 'meta/assessment/originalDataPoint'
import { Objects } from 'utils/objects'

import { BulkDownloadFileFactory } from 'server/controller/cycleData/getBulkDownload/metadata/_types'
import {
  BulkDownloadColNode,
  BulkDownloadColType,
  BulkDownloadDatumType,
  BulkDownloadGetDatum,
  BulkDownloadODPCountryData,
  BulkDownloadRow,
} from 'server/controller/cycleData/getBulkDownload/types'

const tableName = 'odp'
const datumType = BulkDownloadDatumType.string
const colType = BulkDownloadColType.odp

export const getNDPYear: BulkDownloadFileFactory = (props) => {
  const { i18n } = props

  const getDatum: BulkDownloadGetDatum = (props) => {
    const { colName, countryIso, data, variableName } = props
    const countryData = data.odp[countryIso]

    if (Objects.isNil(countryData)) return null

    const tableKey = variableName as keyof BulkDownloadODPCountryData
    const value = countryData[tableKey]

    if (tableKey === 'dataSourceMethods') {
      const method = colName as ODPDataSourceMethod
      const included = Boolean(value?.includes(method))
      return i18n.t(`yesNoTextSelect.${included ? 'yes' : 'no'}`)
    }

    return value as string
  }

  const colNodes: Array<BulkDownloadColNode> = [
    {
      colName: 'minYear',
      colType,
      csvColumn: i18n.t('bulkDownload.NDPYear.earliestYear'),
      datumType,
      getDatum,
      tableName,
      variableName: 'minYear',
    },
    {
      colName: 'maxYear',
      colType,
      csvColumn: i18n.t('bulkDownload.NDPYear.latestYear'),
      datumType,
      getDatum,
      tableName,
      variableName: 'maxYear',
    },
    ...Object.values(ODPDataSourceMethod).map<BulkDownloadColNode>((colName) => {
      return {
        colName,
        colType,
        csvColumn:
          colName === ODPDataSourceMethod.other
            ? i18n.t('common.other')
            : i18n.t(`nationalDataPoint.dataSourceMethodsOptions.${colName}`),
        datumType,
        getDatum,
        tableName,
        variableName: 'dataSourceMethods',
      }
    }),
  ]

  const row: BulkDownloadRow = { colNodes }

  return { getDatum, includeClimaticDomain: true, includeForestArea: true, fileName: 'NDPYear', rows: [row] }
}
