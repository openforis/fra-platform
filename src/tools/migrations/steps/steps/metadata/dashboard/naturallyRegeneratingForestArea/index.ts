import type { RowsMetadata } from 'tools/migrations/steps/steps/metadata/dashboard/utils'
import { getTable } from 'tools/migrations/steps/steps/metadata/dashboard/utils'
import { unit } from 'tools/migrations/steps/steps/metadata/dashboard/utils/unit'

import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { TableNames } from 'meta/assessment/table'
import { ChartColor } from 'meta/chart'
import { DashboardBarChart, DashboardItemType } from 'meta/dashboard'

const cols: Record<string, Array<string>> = {
  '2020': ['1990', '2000', '2010', '2020'],
  '2025': ['1990', '2000', '2015', '2025'],
}

const tableName = TableNames.forestCharacteristics
const tableId = 8
export const naturallyRegeneratingForestArea = (
  assessment: Assessment,
  cycle: Cycle,
  region: boolean
): DashboardBarChart => {
  const cells = [
    {
      variableName: 'naturalForestArea',
      color: ChartColor.green,
      unit: unit(region),
      label: { key: 'statisticalFactsheets.rowName.naturalForestArea' },
    },
    {
      variableName: 'plantedForest',
      color: ChartColor.forestPlanted,
      unit: unit(region),
      label: { key: 'statisticalFactsheets.rowName.plantedForest' },
    },
  ]
  const rowMetadata = (region: boolean): RowsMetadata => {
    return [
      ...cells.map(({ variableName }, i) => ({
        id: i + 1,
        variableName,
        label: { key: `statisticalFactsheets.rowName.${variableName}` },
        calculateFn: `${tableName}.${variableName} ${region ? '/ 1000' : ''}`,
        calculationDependencies: [{ tableName, variableName }],
      })),
    ]
  }

  return {
    type: DashboardItemType.barChart,
    title: {
      key: 'statisticalFactsheets.naturallyRegeneratingForest.title',
      params: { startYear: cols[cycle.name].at(0), endYear: cols[cycle.name].at(-1), unit: unit(region) },
    },
    table: getTable({
      assessment,
      cycle,
      cols: cols[cycle.name],
      tableId,
      rowMetadata: rowMetadata(region),
      tableName,
    }),
    chart: {
      columns: cols[cycle.name],
      cells,
      xAxis: { label: { key: 'common.year' } },
      yAxis: { label: { key: unit(region) } },
    },
  }
}
