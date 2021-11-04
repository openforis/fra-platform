import * as NumberUtils from '@core/utils/numbers'
import { ChartOptions /* ChartTooltipItem */ } from 'chart.js'
import { ChartTypeRegistry } from 'chart.js/auto'
import { ChartType } from './ChartType'

// chart.js has no export for ChartTooltipItem
interface ChartTooltipItem {
  dataIndex: number
  label?: string | undefined
  value?: string | undefined
  xLabel?: string | number | undefined
  yLabel?: string | number | undefined
  datasetIndex?: number | undefined
  index?: number | undefined
  x?: number | undefined
  y?: number | undefined
  dataset: {
    label?: string
    unit?: string
    data: Array<{ datasets: { data: number[] | string[]; unit: string }[] }>
  }
}

const commonOptions = {
  maintainAspectRatio: false,
  responsive: true,
  responsiveAnimationDuration: 200,
  plugins: {
    tooltip: {
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
        label: (tooltipItem: ChartTooltipItem) => {
          const { dataset } = tooltipItem
          return dataset.label || tooltipItem.label
        },
        afterLabel: (tooltipItem: ChartTooltipItem) => {
          const {
            dataset,
            dataset: { data },
          } = tooltipItem
          const { dataIndex } = tooltipItem
          const value = data[dataIndex]

          return `${NumberUtils.formatNumber(value)} (${dataset.unit})`
        },
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
