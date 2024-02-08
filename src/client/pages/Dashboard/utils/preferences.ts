import { Numbers } from 'utils/numbers'

export enum ChartColors {
  // Greens
  green = 'rgb(0,141,156)',
  darkGreen = 'rgb(0,107,118)',
  lightGreen = '#53C5D0',
  greenHover = 'rgba(0,141,156, .7)',
  darkGreenHover = 'rgba(0,107,118, .7)',
  lightGreenHover = 'rgba(83,197,208,0.7)',
  // Oranges
  orange = 'rgb(227,97,48)',
  darkOrange = 'rgb(187,80,39)',
  orangeHover = 'rgba(227,97,48, .7)',
  // Grays
  gray = '#a2a4a7',
  grayHover = 'rgba(162,164,167,.7)',
  darkGray = 'rgb(124,126,128)',
  // Purples
  purple = '#600470',
  purpleHover = 'rgba(96,4,112,0.7)',
}

const commonPreferences = {
  borderWidth: 0,
}

export const preferences = {
  green: {
    ...commonPreferences,
    backgroundColor: ChartColors.green,
    borderColor: ChartColors.darkGreen,
    hoverBackgroundColor: ChartColors.greenHover,
    hoverBorderColor: ChartColors.darkGreenHover,
  },
  orange: {
    backgroundColor: ChartColors.orange,
    borderColor: ChartColors.darkOrange,
    hoverBackgroundColor: ChartColors.orangeHover,
    hoverBorderColor: ChartColors.darkOrange,
  },
}

export const commonOptions = {
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
        label: (tooltipItem: any) => {
          const { dataset } = tooltipItem
          return dataset.label || tooltipItem.label
        },
        afterLabel: (tooltipItem: any) => {
          const {
            dataset,
            dataset: { data },
          } = tooltipItem
          const { dataIndex } = tooltipItem
          const value = data[dataIndex]

          return `${Numbers.format(value as any)} (${dataset.unit})`
        },
      },
    },
  },
}

export const scaleLabel = (text: string) => ({
  display: true,
  fontFamily: `'Open Sans', sans-serif`,
  fontSize: 11,
  lineHeight: 1,
  text,
})
