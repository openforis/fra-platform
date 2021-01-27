import * as R from 'ramda'
import * as NumberUtils from '@common/bignumberUtils'
import { formatValue } from '@webapp/app/countryLanding/views/statisticalFactsheets/utils/numberUtils'

export const types = {
  bar: 'bar',
  pie: 'pie',
}

export const colors = {
  // Greens
  green: 'rgb(0,141,156)',
  darkGreen: 'rgb(0,107,118)',
  lightGreen: '#53C5D0',
  greenHover: 'rgba(0,141,156, .7)',
  darkGreenHover: 'rgba(0,107,118, .7)',
  lightGreenHover: 'rgba(83,197,208,0.7)',
  // Oranges
  orange: 'rgb(227,97,48)',
  darkOrange: 'rgb(187,80,39)',
  orangeHover: 'rgba(227,97,48, .7)',
  darkOrangeHover: 'rgba(187,80,39, .7)',
  // Grays
  gray: '#a2a4a7',
  grayHover: 'rgba(162,164,167,.7)',
  darkGray: 'rgb(124,126,128)',
  darkGrayHover: 'rgba(124,126,128,.7)',
  // Purples
  purple: '#600470',
  purpleHover: 'rgba(96,4,112,0.7)',
  darkPurple: '#40034b',
  darkPurpleHover: 'rgba(64,3,75,0.7)',
}

const commonPreferences = {
  borderWidth: 0,
}

const preferences = [
  {
    ...commonPreferences,
    backgroundColor: colors.green,
    borderColor: colors.darkGreen,
    hoverBackgroundColor: colors.greenHover,
    hoverBorderColor: colors.darkGreenHover,
  },
  {
    backgroundColor: colors.orange,
    borderColor: colors.darkOrange,
    hoverBackgroundColor: colors.orangeHover,
    hoverBorderColor: colors.darkOrange,
  },
]

const arrayHasKey = (array, key) => array.includes(key)

const getDatasetAndLabel = (data, chartHeads, isIsoCountry) => {
  const filteredData = Object.fromEntries(
    Object.entries(data)
      // Filter away values not needed / check they exist in chartHeads, save rowName for label
      .filter(([key, _]) => arrayHasKey([...chartHeads, 'rowName'], key))
  )

  return {
    data: Object.entries(filteredData)
      .filter(([key, _]) => arrayHasKey(chartHeads, key))
      .map(([_, value]) => formatValue(value, isIsoCountry)),
    label: filteredData.rowName,
  }
}

export const getData = (fetchedData, chartHeads, chartName, loaded, i18n, unit, isIsoCountry) => {
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
      label: (tooltipItem, data) => {
        const { datasetIndex, index } = tooltipItem
        const { datasets, labels } = data
        const dataset = datasets[datasetIndex]
        return dataset.label || labels[index]
      },
      afterLabel: (tooltipItem, data) => {
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
  [types.pie]: {
    ...commonOptions,
    legend: {
      position: 'left',
    },
  },

  [types.bar]: {
    ...commonOptions,
    legend: {
      display: false,
    },
    scales: {
      xAxes: [
        {
          stacked: true,
        },
      ],
      yAxes: [
        {
          stacked: true,
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

const _getScaleLabel = (labelString) => ({
  display: true,
  fontFamily: `'Open Sans', sans-serif`,
  fontSize: 11,
  lineHeight: 1,
  labelString,
})

export const getOptions = ({ type, xAxisLabel = null, yAxisLabel = null }) => {
  const options = optionsByType[type]

  if (!options) throw new Error(`Unknown chart type ${type}`)

  return R.pipe(
    R.when(R.always(xAxisLabel), R.assocPath(['scales', 'xAxes', 0, 'scaleLabel'], _getScaleLabel(xAxisLabel))),
    R.when(R.always(yAxisLabel), R.assocPath(['scales', 'yAxes', 0, 'scaleLabel'], _getScaleLabel(yAxisLabel)))
  )(options)
}
