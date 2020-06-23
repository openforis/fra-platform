const colors = {
  green: 'rgb(0,141,156)',
  darkGreen: 'rgb(0,107,118)',
  greenHover: 'rgba(0,141,156, .7)',
  darkGreenHover: 'rgba(0,107,118, .7)',
}

const getValues = (data, chartHeads) => {
  return (
    Object.entries(data)
      // Filter away values not needed / check they exist in chartHeads
      .filter(([key, value]) => !!value && chartHeads.includes(key))
      // Return only the value
      .map(([_, value]) => value)
  )
}

export const getData = (data, chartHeads, chartName, loaded) => {
  const sample = {
    labels: chartHeads,

    datasets: [
      {
        label: 'Loading',
        backgroundColor: colors.green,
        borderColor: colors.darkGreen,
        borderWidth: 1,
        hoverBackgroundColor: colors.greenHover,
        hoverBorderColor: colors.darkGreenHover,
        data: chartHeads.map(() => Math.random() * chartHeads.length),
      },
    ],
  }
  // still fetching data, show skeleton
  if (!loaded) {
    return sample
  }

  return {
    labels: chartHeads,

    datasets: [
      {
        label: chartName,
        backgroundColor: colors.green,
        borderColor: colors.darkGreen,
        borderWidth: 1,
        hoverBackgroundColor: colors.greenHover,
        hoverBorderColor: colors.darkGreenHover,
        data: data.flatMap((entry) => getValues(entry, chartHeads)),
      },
    ],
  }
}

const commonOptions = {
  maintainAspectRatio: false,
}
const chartOptions = {
  bar: (loaded) => ({
    ...commonOptions,
    legend: {
      display: !loaded,
    },
  }),
}

export const getOptions = (chartType, loaded) => (chartOptions[chartType] ? chartOptions[chartType](loaded) : {})
