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

const getDatasetAndLabel = (data, chartHeads) => {
  const filteredData = Object.fromEntries(
    Object.entries(data)
      // Filter away values not needed / check they exist in chartHeads, save rowName for label
      .filter(([key, _]) => arrayHasKey([...chartHeads, 'rowName'], key))
  )

  return {
    data: Object.entries(filteredData)
      .filter(([key, _]) => arrayHasKey(chartHeads, key))
      .map(([_, value]) => value),
    label: filteredData.rowName,
  }
}

export const getData = (fetchedData, chartHeads, chartName, loaded, i18n) => {
  if (!loaded) return {}

  const datasets = fetchedData
    .map((entry) => getDatasetAndLabel(entry, chartHeads))
    .map(({ data, label }, i) => ({
      ...preferences[i],
      label: i18n ? i18n.t(i18n.t(`statisticalFactsheets.rowName.${label}`)) : label,
      data,
    }))

  return {
    labels: chartHeads,
    datasets,
  }
}

const commonOptions = {
  maintainAspectRatio: false,
}
const chartOptions = {
  pie: {
    ...commonOptions,
    height: 350,
  },
  bar: {
    ...commonOptions,
    legend: {
      display: false,
    },
  },
  stackedBar: {
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
        },
      ],
    },
  },
}

export const getOptions = (chartType) => (chartOptions[chartType] ? chartOptions[chartType] : {})
