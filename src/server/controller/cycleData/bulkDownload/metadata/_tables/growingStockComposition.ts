import { CycleNames } from 'meta/assessment/cycle/names'
import { TableNames } from 'meta/assessment/table'
import { Years } from 'meta/assessment/years'
import { RecordAssessmentDatas } from 'meta/data/recordDatas'

import {
  BulkDownloadFileYearsBuilder,
  ColNodeYearsFactory,
} from 'server/controller/cycleData/bulkDownload/metadata/_tables/_fileYearsBuilder'
import { BulkDownloadGetDatum } from 'server/controller/cycleData/bulkDownload/types'

export class GrowingStockCompositionBuilder extends BulkDownloadFileYearsBuilder {
  get unitLabelPath(): Array<string> {
    const { cycle } = this.props

    if (cycle.name !== CycleNames._2020) {
      return ['1', 'cols', '0', 'props', 'labels']
    }

    return super.unitLabelPath
  }

  getBaseColNodes(): Array<ColNodeYearsFactory> {
    const { cycle } = this.props
    const is2020 = cycle.name === CycleNames._2020
    const tableName = is2020 ? TableNames.growingStockComposition : TableNames.growingStockComposition2025
    const years = Years.fraYears(cycle)

    const getDatum: BulkDownloadGetDatum = (props) => {
      const { assessmentName, colName, countryIso, cycleName, data, tableName, variableName } = props

      const propsDatum = { assessmentName, colName, countryIso, cycleName, data: data.tables, tableName, variableName }

      if (is2020) return RecordAssessmentDatas.getDatum(propsDatum)

      const year =
        RecordAssessmentDatas.getDatum({ ...propsDatum, colName: 'mostRecentYear', variableName: 'mostRecentYear' }) ??
        years.at(-1)

      if (year === colName) {
        return RecordAssessmentDatas.getDatum({ ...propsDatum, colName: 'growingStockMillionCubicMeter' })
      }
    }

    const singleFileColumns = [
      { colName: 'growingStockPercent', csvColumn: 'growingStockPercent' },
      { colName: 'growingStockMillionCubicMeter', csvColumn: 'growingStockMillionCubicMeter' },
    ]

    const singleFileColumnsRanked = [
      { colName: 'scientific_name', csvColumn: 'scientific_name' },
      { colName: 'common_name', csvColumn: 'common_name' },
      ...singleFileColumns,
    ]

    return [
      ...Array.from({ length: 10 }, (_, i) => ({
        csvColumn: `2b_native_#${i + 1}`,
        getDatum,
        singleFileColumns: singleFileColumnsRanked,
        tableName,
        variableName: `native${cycle.name === '2020' ? '_r' : 'R'}ank${i + 1}`,
      })),
      {
        csvColumn: '2b_native_remaining',
        getDatum,
        singleFileColumns,
        tableName,
        variableName: cycle.name === '2020' ? 'remaining_native' : 'remainingNative',
      },
      {
        csvColumn: '2b_native_total',
        getDatum,
        singleFileColumns,
        tableName,
        variableName: cycle.name === '2020' ? 'total_native_placeholder' : 'totalNative',
      },
      ...Array.from({ length: 5 }, (_, i) => ({
        csvColumn: `2b_introduced_#${i + 1}`,
        getDatum,
        singleFileColumns: singleFileColumnsRanked,
        tableName,
        variableName: `introduced${cycle.name === '2020' ? '_r' : 'R'}ank${i + 1}`,
      })),
      {
        csvColumn: '2b_introduced_remaining',
        getDatum,
        singleFileColumns,
        tableName,
        variableName: cycle.name === '2020' ? 'remaining_introduced_placeholder' : 'remainingIntroduced',
      },
      {
        csvColumn: '2b_introduced_total',
        getDatum,
        singleFileColumns,
        tableName,
        variableName: 'totalIntroduced',
      },
      {
        csvColumn: '2b_total_gs',
        getDatum,
        singleFileColumns,
        tableName,
        variableName: 'totalGrowingStock',
      },
    ]
  }
}
