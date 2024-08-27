import { Cycle } from './cycle'

const fraYears = (cycle: Cycle) => {
  const years = Array.from({ length: 18 }, (_, i) => String(2000 + i))
  if (cycle.name === '2025') {
    years.push(...Array.from({ length: 7 }, (_, i) => String(2017 + i)))
  }
  return years
}

const intervals = (cycle: Cycle) => {
  const years = ['1990-2000', '2000-2010', '2010-2015', '2015-2020']
  if (cycle.name === '2025') {
    years.push('2020-2025')
  }
  return years
}

export const Years = {
  fraYears,
  intervals,
}
