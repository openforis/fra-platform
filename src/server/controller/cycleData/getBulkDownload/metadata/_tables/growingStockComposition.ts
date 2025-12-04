import { CycleNames } from 'meta/assessment/cycle/names'
import { TableNames } from 'meta/assessment/table'
import { Years } from 'meta/assessment/years'
import { RecordAssessmentDatas } from 'meta/data/recordDatas'

import { BulkDownloadTable } from 'server/controller/cycleData/getBulkDownload/types'

import { BulkDownloadTableFactory } from './_types'

export const getGrowingStockComposition: BulkDownloadTableFactory = (props): BulkDownloadTable => {
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
      })),
      {
        variableName: cycle.name === '2020' ? 'remaining_native' : 'remainingNative',
        csvColumn: '2b_native_remaining',
      },
      {
        variableName: cycle.name === '2020' ? 'total_native_placeholder' : 'totalNative',
        csvColumn: '2b_native_total',
      },
      ...Array.from({ length: 5 }, (_, i) => ({
        variableName: `introduced${cycle.name === '2020' ? '_r' : 'R'}ank${i + 1}`,
        csvColumn: `2b_introduced_#${i + 1}`,
      })),
      {
        variableName: cycle.name === '2020' ? 'remaining_introduced_placeholder' : 'remainingIntroduced',
        csvColumn: '2b_introduced_remaining',
      },
      {
        variableName: 'totalIntroduced',
        csvColumn: '2b_introduced_total',
      },
      {
        variableName: 'totalGrowingStock',
        csvColumn: '2b_total_gs',
      },
    ],
    getDatum,
  }
}
