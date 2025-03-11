import { Cycle } from './cycle'

// TODO: Refactor / dynamic / cycle.props
const fraYears = (cycle: Cycle): Array<string> => {
  if (cycle.name === '2020') {
    return ['1990', '2000', '2010', '2015', '2020']
  }
  return ['1990', '2000', '2010', '2015', '2020', '2025']
}

// TODO: Refactor / dynamic / cycle.props
const intervals = (cycle: Cycle): Array<string> => {
  if (cycle.name === '2020') {
    return ['1990-2000', '2000-2010', '2010-2015', '2015-2020']
  }
  return ['1990-2000', '2000-2010', '2010-2015', '2015-2020', '2020-2025']
}

// TODO: Refactor / dynamic / cycle.props
const annual = (cycle: Cycle): Array<string> => {
  if (cycle.name === '2020') {
    return Array.from({ length: 18 }, (_, i) => String(2000 + i))
  }
  return Array.from({ length: 24 }, (_, i) => String(2000 + i))
}

export const Years = {
  fraYears,
  intervals,
  annual,
}
