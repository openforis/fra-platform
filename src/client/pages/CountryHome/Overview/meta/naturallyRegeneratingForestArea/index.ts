import { Cycle, TableNames } from 'meta/assessment'
import { ChartColor } from 'meta/chart'
import { DashboardItemType } from 'meta/dashboard'
import { DashboardBarChart } from 'meta/dashboard/dashboard'

import { getTable } from 'client/pages/CountryHome/Overview/meta/utils'
import { RowsMetadata } from 'client/pages/CountryHome/Overview/meta/utils/rowsMetadata'
import { unit } from 'client/pages/CountryHome/Overview/meta/utils/unit'

const commonColumns = ['1990', '2000', '2010', '2020']

const cols: Record<string, Array<string>> = {
  '2020': commonColumns,
  '2025': [...commonColumns, '2025'],
}

const tableName = TableNames.forestCharacteristics
const tableId = 8
export const naturallyRegeneratingForestArea = (cycle: Cycle, region: boolean): DashboardBarChart => {
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
    table: getTable({ cycle, cols: cols[cycle.name], tableId, rowMetadata: rowMetadata(region), tableName }),
    chart: {
      columns: cols[cycle.name],
      label: ({ variableName, percent }: any) => `${variableName} ${(percent * 100).toFixed(0)}%`,
      cells,
      xAxis: { label: { key: 'common.year' } },
      yAxis: { label: { key: unit(region) } },
    },
  }
}
