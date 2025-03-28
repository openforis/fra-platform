import { Cycle } from 'meta/assessment/cycle'

const _fraYears: Record<string, Array<string>> = {
  '2020': ['1990', '2000', '2010', '2015', '2020'],
  '2025': ['1990', '2000', '2010', '2015', '2020', '2025'],
  latest: ['1990', '2000', '2010', '2015', '2020', '2025'],
}

// TODO: Refactor / dynamic / cycle.props
const fraYears = (cycle: Cycle): Array<string> => {
  return _fraYears[cycle.name]
}

const _intervals: Record<string, Array<string>> = {
  '2020': ['1990-2000', '2000-2010', '2010-2015', '2015-2020'],
  '2025': ['1990-2000', '2000-2010', '2010-2015', '2015-2020', '2020-2025'],
  latest: ['1990-2000', '2000-2010', '2010-2015', '2015-2020', '2020-2025'],
}

// TODO: Refactor / dynamic / cycle.props
const intervals = (cycle: Cycle): Array<string> => {
  return _intervals[cycle.name]
}

const _annual: Record<string, Array<string>> = {
  '2020': Array.from({ length: 18 }, (_, i) => String(2000 + i)),
  '2025': Array.from({ length: 24 }, (_, i) => String(2000 + i)),
  latest: Array.from({ length: 24 }, (_, i) => String(2000 + i)),
}

// TODO: Refactor / dynamic / cycle.props
const annual = (cycle: Cycle): Array<string> => {
  return _annual[cycle.name]
}

export const Years = {
  fraYears,
  intervals,
  annual,
}
