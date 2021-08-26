import * as NumberUtils from '@common/bignumberUtils'
import { ChartData, ChartOptions /* ChartTooltipItem */ } from 'chart.js'
import { ChartTypeRegistry } from 'chart.js/auto'
import { ChartType } from './ChartType'

// chart.js has no export for ChartTooltipItem
interface ChartTooltipItem {
  label?: string | undefined
  value?: string | undefined
  xLabel?: string | number | undefined
  yLabel?: string | number | undefined
  datasetIndex?: number | undefined
  index?: number | undefined
  x?: number | undefined
  y?: number | undefined
}

const commonOptions = {
  maintainAspectRatio: false,
  responsive: true,
  responsiveAnimationDuration: 200,
  tooltips: {
    backgroundColor: 'rgba(45, 45, 45, 0.95)',
    caretSize: 4,
    cornerRadius: 3,
    position: 'average',
    xPadding: 12,
    yPadding: 18,
    titleAlign: 'center',
    titleFontFamily: `'Open Sans', sans-serif`,
    titleFontSize: 14,
    titleFontStyle: '600',
    titleMarginBottom: 12,
    bodyFontFamily: `'Open Sans', sans-serif`,
    bodyFontSize: 13,
    bodySpacing: 6,
    callbacks: {
      label: (tooltipItem: ChartTooltipItem, data: ChartData) => {
        const { datasetIndex, index } = tooltipItem
        const { datasets, labels } = data
        const dataset = datasets[datasetIndex]
        return dataset.label || labels[index]
      },
      afterLabel: (
        tooltipItem: ChartTooltipItem,
        data: { datasets: { data: number[] | string[]; unit: string }[] }
      ) => {
        const { datasetIndex, index } = tooltipItem
        const { datasets } = data
        const dataset = datasets[datasetIndex]
        const value = dataset.data[index]
        return `${NumberUtils.formatNumber(value)} (${dataset.unit})`
      },
    },
  },
}

const optionsByType = {
  [ChartType.pie]: {
    ...commonOptions,
    legend: {
      position: 'bottom',
    },
  },

  [ChartType.bar]: {
    ...commonOptions,
    legend: {
      display: false,
    },
    scales: {
      xAxes: [
        {
          stacked: true,
          scaleLabel: {},
        },
      ],
      yAxes: [
        {
          stacked: true,
          scaleLabel: {},
          ticks: {
            maxTicksLimit: 6,
            beginAtZero: true,
            stepSize: 0.75,
          },
        },
      ],
    },
  },
}

const _getScaleLabel = (labelString: string): Record<string, string | number | boolean> => ({
  display: true,
  fontFamily: `'Open Sans', sans-serif`,
  fontSize: 11,
  lineHeight: 1,
  labelString,
})

export const getChartOptions = (params: {
  type: ChartType
  xAxisLabel?: string
  yAxisLabel?: string
}): ChartOptions<keyof ChartTypeRegistry> | Record<string, unknown> => {
  const { type, xAxisLabel = null, yAxisLabel = null } = params
  const options = optionsByType[type]

  if (!options) throw new Error(`Unknown chart type ${type}`)

  if (options === optionsByType[ChartType.bar] && Array.isArray(options.scales.xAxes)) {
    options.scales.xAxes[0].scaleLabel = _getScaleLabel(xAxisLabel)
    options.scales.yAxes[0].scaleLabel = _getScaleLabel(yAxisLabel)
  }

  return options
}
