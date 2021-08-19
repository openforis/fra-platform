import { i18n } from 'i18next'
import { formatValue } from '@webapp/pages/StatisticalFactsheets/utils/numberUtils'
import { ChartColors } from './ChartColors'

const commonPreferences = {
  borderWidth: 0,
}
const preferences: Record<string, number | string>[] = [
  {
    ...commonPreferences,
    backgroundColor: ChartColors.green,
    borderColor: ChartColors.darkGreen,
    hoverBackgroundColor: ChartColors.greenHover,
    hoverBorderColor: ChartColors.darkGreenHover,
  },
  {
    backgroundColor: ChartColors.orange,
    borderColor: ChartColors.darkOrange,
    hoverBackgroundColor: ChartColors.orangeHover,
    hoverBorderColor: ChartColors.darkOrange,
  },
]
const arrayHasKey = (array: string[], key: string) => array.includes(key)
const getDatasetAndLabel = (data: Record<string, string | number>, chartHeads: string[], isIsoCountry: boolean) => {
  const filteredData = Object.fromEntries(
    Object.entries(data)
      // Filter away values not needed / check they exist in chartHeads, save rowName for label
      .filter(([key, _]) => arrayHasKey([...chartHeads, 'rowName'], key))
  )

  return {
    data: Object.entries(filteredData)
      .filter(([key, _]) => arrayHasKey(chartHeads, key))
      .map(([_, value]: [string, number]) => formatValue(value, isIsoCountry)),
    label: filteredData.rowName,
  }
}
export const getChartData = (
  fetchedData: Record<string, number>[] | undefined,
  chartHeads: string[],
  loaded: boolean,
  i18n: i18n,
  unit: string,
  isIsoCountry: boolean
) => {
  if (!loaded) return {}

  const datasets = fetchedData
    .map((entry) => getDatasetAndLabel(entry, chartHeads, isIsoCountry))
    .map(({ data, label }, i) => ({
      ...preferences[i],
      label: i18n ? i18n.t(i18n.t(`statisticalFactsheets.rowName.${label}`)) : label,
      data,
      unit,
    }))

  return {
    labels: chartHeads,
    datasets,
  }
}
