import { CycleNames } from 'meta/assessment/cycle/names'
import { TableNames } from 'meta/assessment/table'
import { Years } from 'meta/assessment/years'
import { RecordAssessmentDatas } from 'meta/data/recordDatas'

import { BulkDownloadColVariable, BulkDownloadTable } from 'server/controller/cycleData/getBulkDownload/types'

import { BulkDownloadTableFactory } from './_types'

const colsVariable: Array<BulkDownloadColVariable> = [
  { colName: 'growingStockPercent' },
  { colName: 'growingStockMillionCubicMeter' },
]
const colsVariableRanked: Array<BulkDownloadColVariable> = [
  { colName: 'scientific_name' },
  { colName: 'common_name' },
  ...colsVariable,
]
export const getGrowingStockComposition: BulkDownloadTableFactory = (props) => {
  const { cycle } = props

  const is2020 = cycle.name === CycleNames._2020
  const tableName = is2020 ? TableNames.growingStockComposition : TableNames.growingStockComposition2025
  const years = Years.fraYears(cycle)

  const getDatum: BulkDownloadTable['getDatum'] = (props) => {
    const { assessmentName, colName, countryIso, cycleName, data, tableName, variableName } = props

    if (is2020) return RecordAssessmentDatas.getDatum(props)

    const year =
      RecordAssessmentDatas.getDatum({
        assessmentName,
        cycleName,
        data,
        countryIso,
        tableName,
        variableName: 'mostRecentYear',
        colName: 'mostRecentYear',
      }) ?? years.at(-1)
    if (year === colName) {
      return RecordAssessmentDatas.getDatum({
        assessmentName,
        cycleName,
        data,
        countryIso,
        tableName,
        variableName,
        colName: 'growingStockMillionCubicMeter',
      })
    }
  }

  return {
    tableName,
    variables: [
      ...Array.from({ length: 10 }, (_, i) => ({
        variableName: `native${cycle.name === '2020' ? '_r' : 'R'}ank${i + 1}`,
        csvColumn: `2b_native_#${i + 1}`,
        colsVariable: colsVariableRanked,
      })),
      {
        variableName: cycle.name === '2020' ? 'remaining_native' : 'remainingNative',
        csvColumn: '2b_native_remaining',
        colsVariable,
      },
      {
        variableName: cycle.name === '2020' ? 'total_native_placeholder' : 'totalNative',
        csvColumn: '2b_native_total',
        colsVariable,
      },
      ...Array.from({ length: 5 }, (_, i) => ({
        variableName: `introduced${cycle.name === '2020' ? '_r' : 'R'}ank${i + 1}`,
        csvColumn: `2b_introduced_#${i + 1}`,
        colsVariable: colsVariableRanked,
      })),
      {
        variableName: cycle.name === '2020' ? 'remaining_introduced_placeholder' : 'remainingIntroduced',
        csvColumn: '2b_introduced_remaining',
        colsVariable,
      },
      {
        variableName: 'totalIntroduced',
        csvColumn: '2b_introduced_total',
        colsVariable,
      },
      {
        variableName: 'totalGrowingStock',
        csvColumn: '2b_total_gs',
        colsVariable,
      },
    ],
    getDatum,
  }
}
