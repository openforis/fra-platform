import * as NumberUtils from '@common/bignumberUtils'
import { ChartType } from './types'

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
      label: (tooltipItem: Record<string, string | number>, data: any) => {
        const { datasetIndex, index } = tooltipItem
        const { datasets, labels } = data
        const dataset = datasets[datasetIndex]
        return dataset.label || labels[index]
      },
      afterLabel: (tooltipItem: Record<string, string | number>, data: any) => {
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

const _getScaleLabel = (labelString: string) => ({
  display: true,
  fontFamily: `'Open Sans', sans-serif`,
  fontSize: 11,
  lineHeight: 1,
  labelString,
})

export const getOptions = (params: { type: ChartType; xAxisLabel?: string; yAxisLabel?: string }) => {
  const { type, xAxisLabel = null, yAxisLabel = null } = params
  const options = optionsByType[type]

  if (!options) throw new Error(`Unknown chart type ${type}`)

  if (options === optionsByType[ChartType.bar] && Array.isArray(options.scales.xAxes)) {
    options.scales.xAxes[0].scaleLabel = _getScaleLabel(xAxisLabel)
    options.scales.yAxes[0].scaleLabel = _getScaleLabel(yAxisLabel)
  }

  return options
}
