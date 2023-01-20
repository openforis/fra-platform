import { Plugin } from 'chart.js'

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

export const displayPercentagesPlugin = (percentages: Array<number>, backgroundColors: Array<string>): Plugin => {
  return {
    id: 'displayPercentages',
    afterDraw: (chart) => {
      const {
        ctx,
        data: { datasets },
      } = chart
      const _metasets = chart.getDatasetMeta(0)
      datasets[0].data.forEach((dp, i) => {
        const barValue = `${percentages[i]}%`
        const lineHeight = ctx.measureText('M').width
        ctx.fillStyle = backgroundColors[i]
        ctx.textAlign = 'center'
        ctx.fillText(barValue, _metasets.data[i].x, _metasets.data[i].y - lineHeight * 1.5)
      })
    },
  }
}
