import { ChartOptions, Plugin } from 'chart.js'

export type GeoChartOptions = Partial<ChartOptions<'bar'>> & {
  backgroundColors: string[]
  percentages: number[]
}

export const whiteBackgroundplugin = (): Plugin => {
  return {
    id: 'white-background-on-download',
    beforeDraw: (chartCtx) => {
      const ctx = chartCtx.canvas.getContext('2d')
      ctx.save()
      ctx.globalCompositeOperation = 'destination-over'
      ctx.fillStyle = 'white'
      ctx.fillRect(0, 0, chartCtx.width, chartCtx.height)
      ctx.restore()
    },
  }
}

export const displayPercentagesPlugin = (): Plugin => {
  return {
    id: 'displayPercentages',
    beforeDraw: (chart) => {
      const {
        ctx,
        data: { datasets },
      } = chart
      const _metasets = chart.getDatasetMeta(0)
      const chartOptions = chart.config?.options as GeoChartOptions

      datasets[0].data.forEach((_, i) => {
        const barValue = `${chartOptions?.percentages?.[i]}%`
        const lineHeight = ctx.measureText('M').width
        ctx.save()
        ctx.translate(_metasets.data[i].x + lineHeight / 3, _metasets.data[i].y - 5)
        ctx.rotate(-Math.PI / 2)
        ctx.fillStyle = chartOptions?.backgroundColors[i]
        ctx.fillText(barValue, 0, 0)
        ctx.restore()
      })
    },
  }
}
