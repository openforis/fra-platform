import * as d3 from 'd3'
import R from 'ramda'

export const styles = {
  width: 800,
  height: 300,
  padding: 30
}

// Returns the highest Y coordinate from the data set
export const yMax = (data) => d3.max(data, (d) => d.forestArea)

// Returns a function that "scales" X coordinates from the data to fit the chart
export const getXScale = (data) => {
  return d3.scaleLinear()
    .domain([1987, 2023])
    .range([styles.padding, styles.width - styles.padding * 2])
}

// Returns a function that "scales" Y coordinates from the data to fit the chart
export const getYScale = (data) => {
  let max = yMax(data)
  max = max ? max : 98765

  return d3.scaleLinear()
    .domain([0, max])
    .range([styles.height - styles.padding, styles.padding])
}

const linearExtrapolation = (x, xa, ya, xb, yb) => {
  let y = ya + (x - xa) / (xb - xa) * (yb - ya)
  y = y < 0 ? 0 : y
  return y
}

const linearExtrapolationBackwards = (x, xa, ya, xb, yb) => {
  let y = yb + (xb - x) / (xb - xa) * (ya - yb)
  y = y < 0 ? 0 : y
  return y
}

export const addPlaceholders = (data) => {

  const fraData = R.filter(v => v.type === 'fra', data)

  if (data.length >= 2 && fraData.length > 0) {
    const firstPoint = {
      year: 1987, type: 'placeholder',
      forestArea: linearExtrapolationBackwards(1987, data[0].year, data[0].forestArea, data[1].year, data[1].forestArea)
    }
    const lastIndex = data.length - 1
    const lastPoint = {
      year: 2023, type: 'placeholder',
      forestArea: linearExtrapolation(2023, data[lastIndex - 1].year, data[lastIndex - 1].forestArea, data[lastIndex].year, data[lastIndex].forestArea)
    }
    return R.pipe(
      R.insert(0, firstPoint),
      R.insert(data.length + 1, lastPoint)
    )(data)

  }
  return data
}
